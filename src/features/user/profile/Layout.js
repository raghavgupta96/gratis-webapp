import React, { Component } from 'react';
import {
  object,
  shape,
  string,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

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
    edit: {
      name: false,
    },
  }

  handlers = {
    handleEditChange: key => (value) => {
      this.setState(state => ({
        ...state,
        edit:{
          ...this.state.edit,
          [key]: value
        }
      }))
    }
  }

  componentDidMount() {
    const { user } = this.props;
    if (user) this.setState({ user });
  }

  renderProfile() {
    const {
      classes,
      user
    } = this.props;
    /*
    const {
      handleEditChange
    } = this.handlers;
    */
    const {
      edit
    } = this.state;

    return (
      <div className={classes.profile}>
        {user.name || !edit.name
          ? <Typography></Typography>
          : (<TextField
               value={this.state.user.name}
             />)}
      </div>
    );
  }

  renderEdit() {
    const {
      user
    } = this.props;
    return (
      <TextField
        label="Name"
        value={user.name}
      />
    );
  }

  render() {
    const { classes } = this.props;
    /*
    const {
      user,
      edit
    } = this.state;
    */

    return (
      <div className={classes.layout}>
        <div className={classes.content}>
          {this.renderProfile()}
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="Add"
          >
            <EditIcon />
          </Fab>

        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ProfileLayout);
