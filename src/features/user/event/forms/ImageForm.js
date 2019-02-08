import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Form.styles';

const imageForm = (props) => {
  const {
    classes,
    fileHandler
  } = props;

  return (
    <form className={classes.form}>
      <div className={classes.inputfileContainer}>
        <input
          className={classes.inputfile}
          type="file"
          name="file"
          id="file"
          onChange={event => {
            if (event.target.files.length === 1) fileHandler(event.target.files[0])
          }}
        />
        <label htmlFor="file">Upload Pictures Here!</label>
      </div>
    </form>
  );
};

imageForm.propTypes = {
  newEvent: PropTypes.object,
  handlers: PropTypes.objectOf(PropTypes.func)
};

imageForm.defaultProps = {
  newEvent: { },
  handlers: { }
};

export default withStyles(
  styles,
  { withTheme: true }
)(imageForm);
