import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  shape,
  string,
  arrayOf,
  objectOf,
  func,
} from 'prop-types';

import { userActionTypes } from './modules/redux/reducers/user';
import { eventsActionTypes } from './modules/redux/reducers/events';
import {
  auth,
  firestore,
  storage,
} from './modules/firebase';
import UserLayout from './features/user/Layout';
import VisitorLayout from './features/visitor/Layout';
import styles from './App.styles';

/** The root of the application. */
class App extends Component {
  static propTypes = {
    classes: shape({
      root: string,
      content: string,
    }).isRequired,
    user: shape({
      eventIDs: arrayOf(string),
    }).isRequired,
    events: objectOf(shape({
    })).isRequired,
    setUserFromSnapshot: func.isRequired,
    deleteUser: func.isRequired,
    addEvent: func.isRequired,
    deleteEvents: func.isRequired,
  };

  state = {
    // These are called whenever we want to stop listening to snapshots.
    unsubscribeUserDoc: () => { },
    unsubscribeEventsOfUser: () => { },
    error: { },
  };

  handlers = {
    /**
     * Logs into firebase using an email and password.
     * On a successful login, this function subscribes to the authenticated user's doc and events.
     * On an unsuccessful login, this function saves the error as state.
     */
    login: (email, password) => {
      auth.signInWithEmailAndPassword(email, password)
        .then(userRef => this.setUser(userRef.user))
        .catch(error => this.setState({ error }));
    },
    /**
     * Clears redux and unsubscribes from snapshots.
     */
    signOut: () => {
      auth.signOut()
        .then(() => {
          const {
            deleteUser,
            deleteEvents,
          } = this.props;
          const {
            unsubscribeUserDoc,
            unsubscribeEventsOfUser,
          } = this.state;

          deleteUser();
          deleteEvents();
          unsubscribeUserDoc();
          unsubscribeEventsOfUser();
        });
    },
  }

  /** When the component mounts, subscribe to snapshots of the user and the user's events. */
  componentDidMount() {
    // Whenever the user's authentication state changes,
    // unsubscribe to all snapshots of the user doc and the user's events,
    // then resubscribe if the user has been authenticated.
    auth.onAuthStateChanged(user => this.setUser(user));
  }

  /**
   * A helper function that handles changes in the user. This function will:
   * 1) Unsubscribe from the old user's document and events collection snapshots.
   * 2) Wipe redux's old user and events documents.
   * 3) Subscribe to snapshots of the new user's document and events collection.
   */
  setUser(user) {
    const { setUserFromSnapshot } = this.props;
    const {
      unsubscribeUserDoc,
      unsubscribeEventsOfUser,
    } = this.state;

    if (user) {
      const { uid } = user;

      // Unsubscribe and wipe redux.
      unsubscribeUserDoc();
      unsubscribeEventsOfUser();

      // Resubscribe.
      const unsubUserDoc = firestore.onUserSnapshot(uid, (snapshot) => {
        setUserFromSnapshot(snapshot, uid);
      });
      const unsubEventsOfUser = firestore.onEventsOfUserSnapshot(uid, (snapshot) => {
        this.setEventsFromSnapshot(snapshot);
      });
      this.setState({
        unsubscribeUserDoc: unsubUserDoc,
        unsubscribeEventsOfUser: unsubEventsOfUser,
      });
    }
  }

  /**
   * A helper function that iterates through the Events collection's documents
   * and saves each document to redux.
   */
  setEventsFromSnapshot(snapshot) {
    const {
      addEvent,
      deleteEvents,
    } = this.props;

    deleteEvents();

    snapshot.forEach((doc) => {
      storage.getDownloadURL(doc.get('imagePath'))
        .then((url) => {
          addEvent({
            eventID: doc.id,
            event: {
              ...doc.data(),
              imagePath: url,
              storagePath: doc.get('imagePath'),
            },
          });
        });
    });
  }

  /** Renders UserLayout or VisitorLayout. */
  renderLayout() {
    const {
      user,
      events,
    } = this.props;
    const {
      error,
    } = this.state;

    // Define the UserLayout container.
    const renderUserLayout = () => {
      const props = {
        user,
        events,
        signOut: this.handlers.signOut,
      };
      return <UserLayout {...props} />;
    };

    // Define the VisitorLayout container.
    const renderVisitorLayout = () => {
      const props = {
        login: this.handlers.login,
        error,
      };
      return <VisitorLayout {...props} />;
    };

    return user.uid
      ? renderUserLayout()
      : renderVisitorLayout();
  }

  /** Renders App. */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {this.renderLayout()}
        </div>
      </div>
    );
  }
}

/** Maps redux store state to props. */
const mapStateToProps = state => ({
  user: state.userReducer,
  events: state.eventsReducer,
});
/** Maps redux dispatch calls to props. */
const mapDispatchToProps = dispatch => ({
  setUserFromSnapshot: (snapshot, uid) => dispatch({
    type: userActionTypes.SET_USER,
    user: {
      ...snapshot.data(),
      uid,
    },
  }),
  deleteUser: () => dispatch({ type: userActionTypes.SET_USER, user: { } }),
  addEvent: payload => dispatch({ type: eventsActionTypes.ADD_EVENT, payload }),
  deleteEvents: () => dispatch({ type: eventsActionTypes.SET_EVENTS, events: { } }),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    withStyles(styles)(App),
  ),
);
