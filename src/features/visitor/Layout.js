import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { auth } from '../../modules/firebase';
import styles from './Layout.styles';
import logo from './Logo-h500px.png';
import LoginForm from './login/Form';

class VisitorLayout extends Component {
  state = {
    email: '',
    password: '',
    error: null
  }

  handlers = {
    stateChange: key => value => this.setState({ [key]: value }),
    login: () => {
      const { email, password } = this.state;
      const { setUser } = this.props;

      auth.doSignInWithEmailAndPassword(email, password)
        .then((userRef) => {
          const { user } = userRef;
          const { uid } = user;
          setUser(user);
          console.log(`[VisitorLayout] Signed in with uid ${uid}`);
        })
        .catch((error) => {
          this.setState({ error });
        });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      stateChange,
      login
    } = this.handlers;

    const loginFormHandlers = {
      emailHandler: stateChange('email'),
      passwordHandler: stateChange('password'),
      login
    }

    return (
      <div
        className={classes.layout}
        onKeyPress={(event) => { if (event.key === 'Enter') login(); }}
      >
        <img className={classes.logo} alt="logo" src={logo} />
        <LoginForm
          {...this.state}
          {...loginFormHandlers}
        />
      </div>
    );
  }
}

export default withStyles(
  styles,
  { withTheme: true }
)(VisitorLayout);
