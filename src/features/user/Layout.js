import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  withRouter,
} from 'react-router-dom';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import EventsLayout from './event/Layout';
import AnalyticsLayout from './analytics/Layout';
import ProfileLayout from './profile/Layout';
import NavDrawer from './NavDrawer';
import logo from './Logo-h500px.png';
import styles from './Layout.styles';

/** Container seen by authenticated users. */
class UserLayout extends Component {
  static propTypes = {
    history: object.isRequired,
    classes: shape({
      container: string,
      layout: string,
      appBar: string,
      grow: string,
      logo: string,
      menuButton: string,
    }).isRequired,
    user: object.isRequired,
    events: object.isRequired,
    signOut: func.isRequired,
  }

  state = {
    showDrawer: false,
    anchorEl: null,
    routes: [
      { name: 'Events', path: '/events' },
      { name: 'Analytics', path: '/analytics' },
    ],
  }

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
    toggleDrawer: () => {
      this.setState(state => ({ showDrawer: !state.showDrawer }));
    },
  }

  /** Make sure that when leaving, the path resets to "/". */
  componentWillUnmount() {
    const { history } = this.props;
    history.replace('/');
  }

  renderAppBar() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const {
      handleChange,
      toggleDrawer,
    } = this.handlers;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="Menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <img
            className={classes.logo}
            src={logo}
            alt="Gratis Logo"
          />
          <div className={classes.grow} />
          <IconButton
            aria-owns={anchorEl ? 'profile-menu' : undefined}
            aria-haspopup="true"
            onClick={event => handleChange('anchorEl')(event.currentTarget)}
          >
            <AccountCircleIcon />
          </IconButton>
          {this.renderProfileMenu()}
        </Toolbar>
      </AppBar>
    );
  }

  renderProfileMenu() {
    const {
      signOut,
      user,
    } = this.props;
    const { anchorEl } = this.state;
    const { handleChange } = this.handlers;

    return (
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleChange('anchorEl')(null)}
      >
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="Profile Picture">{user.name[0].toUpperCase()}</Avatar>
            }
            action={(
              <div>
                <NavLink
                  to="/profile"
                  replace
                >
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                </NavLink>
                <IconButton onClick={signOut}>
                  <ExitToAppIcon />
                </IconButton>
              </div>
            )}
          />
        </Card>
      </Menu>
    );
  }

  renderNavDrawer() {
    const {
      routes,
      showDrawer,
    } = this.state;

    const props = {
      routes,
      showDrawer,
      closeDrawer: () => this.handlers.handleChange('showDrawer')(false),
    };
    return (
      <NavDrawer
        {...props}
      />
    );
  }

  renderLayout() {
    const {
      user,
      events,
    } = this.props;

    return (
      <Switch>
        <Route path="/events" render={() => <EventsLayout user={user} events={events} />} />
        <Route path="/analytics" render={() => <AnalyticsLayout user={user} events={events} />} />
        <Route path="/profile" component={() => <ProfileLayout user={user} />} />
        <Redirect to="/events" />
      </Switch>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.layout}>
          <div className={classes.appBar}>
            {this.renderAppBar()}
          </div>
          {this.renderNavDrawer()}
          {this.renderLayout()}
        </div>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles)(UserLayout),
);
