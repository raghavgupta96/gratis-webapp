import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  withRouter
} from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { auth, firestore } from '../../modules/firebase';
import { eventsActionTypes } from '../../modules/redux/reducers/events';
import EventsLayout from './event/Layout';
import AnalyticsLayout from './analytics/Layout';
import ProfileLayout from './profile/Layout';
import SettingsLayout from './settings/Layout';
import logo from './Logo-h500px.png';
import styles from './Layout.styles';
import { userActionTypes } from '../../modules/redux/reducers/user';

const routes = [
  { name: 'Events', path: '/events' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'Profile', path: '/profile' },
  { name: 'Settings', path: '/settings' }
  // { name: 'Analytics}, path: '/analytics' }
];

class UserLayout extends Component {
  state = {
    showDrawer: false
  };

  handlers = {
    signOut: () => {
      auth.doSignOut()
        .then(() => {
          this.props.deleteUser();
          this.props.deleteEvents();
        });
    },
    toggleDrawer: () => this.setState((state, props) => ({ showDrawer: !state.showDrawer }))
  }

  componentDidMount() {
    const {
      user,
      setEvents
    } = this.props;

    /*
    firestore.getEventsOfUID(user.uid)
      .onSnapshot((snapshot) => {
        setEvents(snapshot.data())
    });
    */
  }

  renderDrawer() {
    const { classes } = this.props;
    const {
      signOut,
      toggleDrawer
    } = this.handlers;
    const links = routes.map(route => (
      <NavLink
        activeClassName="ActiveNavItem"
        className="NavItem"
        key={route.path}
        to={route.path}
        replace
      > <Button variant="text" className="NavText"> {route.name} </Button>
      </NavLink>
    ));
    return (
      <Drawer
        anchor="left"
        open={this.state.showDrawer}
        onClose={toggleDrawer}
      >
        <img
          alt="logo"
          src={logo}
          className={classes.logo}
        />
        <Button
          className="SignOutButton"
          variant="text"
          onClick={signOut}
        > Sign Out
        </Button>
        {links}
      </Drawer>
    );
  }

  renderToolbar() {
    const { toggleDrawer } = this.handlers;

    return (
      <IconButton
        aria-label="Menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
    )
  }

  renderLayout() {
    const { user, events } = this.props;
    return (
      <Switch>
        <Route path="/events" render={() => <EventsLayout user={user} events={events} />} />
        <Route path="/analytics" render={() => <AnalyticsLayout user={user} events={events} />} />
        <Route path="/profile" component={ProfileLayout} />
        <Route path="/settings" component={SettingsLayout} />
        <Redirect exact from="/" to="/events" />
      </Switch>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        {this.renderDrawer()}
        <div className={classes.layout}>
          <div className={classes.toolbar}>
            {this.renderToolbar()}
          </div>
          {this.renderLayout()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteUser: () => dispatch({ type: userActionTypes.SET_USER, user: null }),
  setEvents: (events) => dispatch({ type: eventsActionTypes.SET_EVENTS, events })
});

UserLayout.propTypes = {
  handlers: PropTypes.objectOf(PropTypes.func)
};
UserLayout.defaultProps = {
  events: [],
  handlers: { }
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(withStyles(
    styles,
    { withTheme: true }
  )(UserLayout))
);
