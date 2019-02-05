import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './Form.styles';

const eventForm = (props) => {
  const {
    classes,
    event,
    titleHandler,
    descriptionHandler,
    startDateHandler,
    endDateHandler
  } = props;

  const renderForm = () => (
    <form className={classes.form}>
      <TextField
        className={classes.eventTextField}
        label="Title"
        value={event.title}
        onChange={event => titleHandler(event.target.value)}
        fullWidth
      />
      <TextField
        className={classes.eventTextField}
        label="Description"
        value={event.description}
        onChange={event => descriptionHandler(event.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows="5"
      />
      <div className={classes.eventDate}>
        <TextField
          label="Start Date & Time"
          type="datetime-local"
          value={event.startDate}
          onChange={e => startDateHandler(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date & Time"
          type="datetime-local"
          value={event.endDate}
          onChange={e => endDateHandler(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </div>
    </form>
  );
  return renderForm();
};

eventForm.propTypes = {
  newEvent: PropTypes.object,
  handlers: PropTypes.objectOf(PropTypes.func)
};

eventForm.defaultProps = {
  newEvent: null,
  handlers: { }
};

export default withStyles(
  styles,
  { withTheme: true }
)(eventForm);
