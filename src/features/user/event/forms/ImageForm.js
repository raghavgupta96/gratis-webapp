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
  imagePreviewUrl: string,
};

const defaultProps = {
  imagePreviewUrl: undefined,
};

const imageForm = (props) => {
  const {
    classes,
    fileHandler,
    imagePreviewUrl,
  } = props;

  return (
    <form className={classes.form}>
      <div className={classes.inputfileContainer}>
        {/** TODO: Fix eslint warning. */}
        <input
          className={classes.inputfile}
          type="file"
          name="file"
          id="file"
          onChange={(event) => {
            event.preventDefault();

            if (event.target.files.length === 1) {
              const reader = new FileReader();
              const file = event.target.files[0];

              reader.onloadend = () => {
                fileHandler(file, reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        {imagePreviewUrl ? <img alt="Event" className={classes.image} src={imagePreviewUrl} /> : null}
        <label htmlFor="file">
          Upload Pictures Here!
        </label>
      </div>
    </form>
  );
};

imageForm.propTypes = propTypes;
imageForm.defaultProps = defaultProps;

export default withStyles(styles)(imageForm);
