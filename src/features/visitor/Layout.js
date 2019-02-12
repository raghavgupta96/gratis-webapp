import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';

import LoginForm from './login/Form';
import styles from './Layout.styles';
import logo from './Logo-h500px.png';

/** Container seen by unauthenticated users. */
class VisitorLayout extends Component {
  static propTypes = {
    classes: shape({
      layout: string,
      logo: string,
    }).isRequired,
    error: object.isRequired,
    login: func.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
  }

  renderLoginForm() {
    const {
      error,
      login,
    } = this.props;
    const {
      email,
      password,
    } = this.state;
    const { handleChange } = this.handlers;

    const loginFormProps = {
      ...this.state,
      emailHandler: handleChange('email'),
      passwordHandler: handleChange('password'),
      login: () => login(email, password),
      error,
    };
    return <LoginForm {...loginFormProps} />;
  }

  render() {
    const {
      classes,
      login,
    } = this.props;
    const {
      email,
      password,
    } = this.state;

    return (
      <div
        className={classes.layout}
        onKeyPress={(event) => { if (event.key === 'Enter') login(email, password); }}
        role="presentation"
      >
        <img className={classes.logo} alt="logo" src={logo} />
        {this.renderLoginForm()}
      </div>
    );
  }
}

export default withStyles(styles)(VisitorLayout);
