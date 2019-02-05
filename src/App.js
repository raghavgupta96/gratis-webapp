import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  auth,
  firestore
} from './modules/firebase';
import { userActionTypes } from './modules/redux/reducers/user';
import UserLayout from './features/user/Layout';
import VisitorLayout from './features/visitor/Layout';
import styles from './App.styles';
import { eventsActionTypes } from './modules/redux/reducers/events';

class App extends Component {
  componentDidMount() {
    const {
      setUser,
      setEvents
    } = this.props;

    auth.onAuthStateChanged(user => {
      setUser(user);
      firestore.getEventsOfUID(user.uid)
        .onSnapshot((snapshot) => {
          setEvents(snapshot.data())
      });
    });
  }

  renderLayout() {
    const {
      classes,
      user,
      events,
      setUser
    } = this.props;
    const userLayoutHandlers = { setUser };
    const visitorLayoutHandlers = { setUser };
    const layout = user
      ? (
        <UserLayout
          className={classes.content}
          user={user}
          events={events}
          {...userLayoutHandlers}
        />)
      :(
        <VisitorLayout
          className={classes.content}
          {...visitorLayoutHandlers}
        />);
    return layout;
  }

  render() {
    const { classes } = this.props;
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
            <Route path="/" component={() => this.renderLayout()} />
          </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
  events: state.eventsReducer
});
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: userActionTypes.SET_USER, user }),
  setEvents: events => dispatch({ type: eventsActionTypes.SET_EVENTS, events })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(App));
