import React from 'react';
import {
  withRouter,
  NavLink,
} from 'react-router-dom';
import {
  arrayOf,
  shape,
  string,
  bool,
  func,
} from 'prop-types';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import styles from './NavDrawer.styles';

const propTypes = {
  classes: shape({
    navLink: string,
    activeNavLink: string,
  }).isRequired,
  routes: arrayOf(
    shape({
      name: string,
      path: string,
    }),
  ).isRequired,
  showDrawer: bool.isRequired,
  closeDrawer: func.isRequired,
};

const navDrawer = (props) => {
  const {
    classes,
    routes,
    showDrawer,
    closeDrawer,
  } = props;

  const links = routes.map(route => (
    <NavLink
      activeClassName={classes.activeNavLink}
      className={classes.navLink}
      key={route.path}
      to={route.path}
      replace
    >
      <Button
        variant="text"
        fullWidth
      >
        {route.name}
      </Button>
    </NavLink>
  ));

  return (
    <Drawer
      anchor="left"
      open={showDrawer}
      onClose={closeDrawer}
    >
      {links}
    </Drawer>
  );
};

navDrawer.propTypes = propTypes;

export default withRouter(
  withStyles(
    styles,
    { withTheme: true },
  )(navDrawer),
);
