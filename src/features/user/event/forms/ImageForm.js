import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Form.styles';

const imageForm = (props) => {
  const {
    classes,
    fileHandler,
    deleteImage,
    // newEvent
    imageURLs
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
        <label for="file">Upload Pictures Here!</label>
      </div>
      {/*
      <div>
        {imageURLs.map((e, i) => (
          <div>
            <img src={e} alt="Thumbnail" />
            <button onClick={deleteImage}>remove</button>
          </div>
        ))}
      </div>
      */}
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
