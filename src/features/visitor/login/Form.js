import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './Form.styles';

const form = (props) => {
  const {
    classes,
    email,
    password,
    error,
    emailHandler,
    passwordHandler,
    loginHandler
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
        onClick={loginHandler}
      > Login
      </Button>
    </div>
  );

  const renderError = () => error
    ? <p className={classes.error}>{error.message}</p>
    : <p className={classes.error} />;

  return (
    <div className={classes.container}>
      {renderForm()}
      {renderControls()}
      {renderError()}
    </div>
  );
};

form.propTypes = {
  credentials: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }),
  setters: PropTypes.objectOf(PropTypes.func),
  handlers: PropTypes.objectOf(PropTypes.func),
  error: PropTypes.object // Not sure what the shape of an error should be
};
form.defaultProps = {
  credentials: {
    email: '',
    password: ''
  },
  setters: null,
  handlers: {
    loginHandler: () => window.alert('submitted')
  },
  error: null
};

export default withStyles(
  styles,
  { withTheme: true}
)(form);
