import React from 'react';
import {
  shape,
  string,
  func,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Form.styles';

const propTypes = {
  classes: shape({
    form: string,
    inputfileContainer: string,
    inputfile: string,
  }).isRequired,
  fileHandler: func.isRequired,
};

const imageForm = (props) => {
  const {
    classes,
    fileHandler,
  } = props;

  return (
    <form className={classes.form}>
      <div className={classes.inputfileContainer}>
        {/** TODO: Fix eslint warning. */}
        <label htmlFor="file">
          Upload Pictures Here!
        </label>
        <input
          className={classes.inputfile}
          type="file"
          name="file"
          id="file"
          onChange={(event) => {
            if (event.target.files.length === 1) fileHandler(event.target.files[0]);
          }}
        />
      </div>
    </form>
  );
};

imageForm.propTypes = propTypes;

export default withStyles(styles)(imageForm);
