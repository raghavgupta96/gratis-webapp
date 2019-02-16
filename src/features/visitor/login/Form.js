import React from 'react';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import styles from './Form.styles';

const propTypes = {
  classes: shape({
    container: string,
    form: string,
    controls: string,
    textField: string,
    submitButton: string,
    error: string,
  }).isRequired,
  email: string.isRequired,
  password: string.isRequired,
  error: object.isRequired,
  emailHandler: func.isRequired,
  passwordHandler: func.isRequired,
  login: func.isRequired,
};

const loginForm = (props) => {
  const {
    classes,
    email,
    password,
    error,
    emailHandler,
    passwordHandler,
    login,
  } = props;

  const renderForm = () => (
    <form className={classes.form}>
      <TextField
        className={classes.textField}
        fullWidth
        required
        id="email"
        label="E-mail"
        type="email"
        value={email}
        onChange={event => emailHandler(event.target.value)}
      />
      <TextField
        className={classes.textField}
        fullWidth
        required
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={event => passwordHandler(event.target.value)}
      />
    </form>
  );

  const renderControls = () => (
    <div className={classes.controls}>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        onClick={login}
      >
      Login
      </Button>
    </div>
  );

  const renderError = <p className={classes.error}>{error.message}</p>;

  return (
    <div className={classes.container}>
      {renderForm()}
      {renderControls()}
      {renderError}
    </div>
  );
};

loginForm.propTypes = propTypes;

export default withStyles(
  styles,
  { withTheme: true },
)(loginForm);
