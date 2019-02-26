import React, { Component } from 'react';
import {
  object,
  shape,
  string,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import styles from './Layout.styles';

class ProfileLayout extends Component {
  static propTypes = {
    classes: shape({
      profile: string,
    }).isRequired,
    user: object.isRequired,
  }

  state = {
    user: {
      name: '',
      cuisine: '',
      area: '',
    },
  }

  handlers = {
    handleUserChange: key => (value) => {
      this.setState(state => ({
        user: {
          ...state.user,
          [key]: value,
        },
      }));
    },
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) this.setState({ user });
  }

  renderProfile() {
    const {
      classes,
    } = this.props;
    const {
      user,
    } = this.state;
    const {
      handleUserChange,
    } = this.handlers;

    return (
      <div className={classes.profile}>
        <Typography variant="h2">{user.name}</Typography>
        <Typography variant="">
          Area:
          {user.area}
        </Typography>
        <Typography variant="">
          Cuisine:
          {user.cuisine}
        </Typography>
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.layout}>
        <div className={classes.content}>
          {this.renderProfile()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileLayout);
