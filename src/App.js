import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { userActionTypes } from './modules/redux/reducers/user';
import { eventsActionTypes } from './modules/redux/reducers/events';
import UserLayout from './features/user/Layout';
import VisitorLayout from './features/visitor/Layout';
import {
  auth,
  firestore,
  storage
} from './modules/firebase';
import styles from './App.styles';

class App extends Component {
  // When the component mounts, subscribe to changes of the user's info and
  // the user's events.
  componentDidMount() {
    const {
      setUser,
      addEvent,
      deleteEvents
    } = this.props;

    // When authentication state changes...
    auth.onAuthStateChanged(user => {
      // And if there is a user...
      if (user) {
        // Everytime the user's info updates...
        firestore
          .doGetUser(user.uid)
          .onSnapshot((snapshot) => {
            // Save the user's info in redux...
            setUser({
              ...snapshot.data(),
              uid: user.uid
            });
            // And every time the user's events update...
            firestore
              .doGetEventsOfUser(user.uid)
              .onSnapshot((snapshot) => {
                // Clear the events from redux...
                deleteEvents();
                // Iterate through all the events...
                snapshot.forEach((doc) => {
                  // Get the downloadURL for the event images...
                  storage
                    .getDownloadURL(doc.get('imagePath'))
                    .then((url) => {
                      // And finally store the event info with the image path in redux
                      addEvent({
                        eventID: doc.id,
                        event: {
                          ...doc.data(),
                          imagePath: url,
                          storagePath: doc.get('imagePath')
                        }
                      })
                    });
                })
              })
        });
      }
   });
  }

  // Renders either <UserLayout /> (for vendors)
  // or <VisitorLayout /> (for the unauthenticated)
  renderLayout() {
    const {
      classes,
      user,
      events,
      setUser
    } = this.props;
    const userLayoutProps = {
      className: classes.content,
      user,
      events,
      setUser
    };
    const visitorLayoutProps = {
      className: classes.content,
      setUser
    };
    const layout = user
      ? <UserLayout {...userLayoutProps}/>
      : <VisitorLayout {...visitorLayoutProps} />;
    return layout;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      {this.renderLayout()}
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  events: state.eventsReducer
});
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: userActionTypes.SET_USER, user }),
  addEvent: event => dispatch({ type: eventsActionTypes.ADD_EVENT, event }),
  deleteEvents: () => dispatch({ type: eventsActionTypes.SET_EVENTS, events: { } })
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
  withStyles(
    styles,
    { withTheme: true }
  )(App)));
