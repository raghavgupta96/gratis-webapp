import React from 'react';
import {
  object,
  shape,
  string,
  func,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import styles from './Form.styles';

const propTypes = {
  classes: shape({
    form: string,
    eventTextField: string,
    eventDate: string,
    datetimePicker: string,
  }).isRequired,
  event: object.isRequired,
  titleHandler: func.isRequired,
  descriptionHandler: func.isRequired,
  startDateHandler: func.isRequired,
  endDateHandler: func.isRequired,
};

const eventForm = (props) => {
  const {
    classes,
    event,
    titleHandler,
    descriptionHandler,
    startDateHandler,
    endDateHandler,
  } = props;

  const renderForm = () => (
    <form className={classes.form}>
      <TextField
        className={classes.eventTextField}
        label="Title"
        value={event.title}
        onChange={e => titleHandler(e.target.value)}
        fullWidth
      />
      <TextField
        className={classes.eventTextField}
        label="Description"
        value={event.description}
        onChange={e => descriptionHandler(e.target.value)}
        variant="outlined"
        fullWidth
        multiline
        rows="5"
      />
      <div className={classes.eventDate}>
        <TextField
          className={classes.datetimePicker}
          label="Start Date & Time"
          type="datetime-local"
          value={event.startDate}
          onChange={(e) => {
            if (e.target.value > event.endDate && event.endDate !== '') {
              window.alert("The event's start time must come before it's end");
            } else {
              startDateHandler(e.target.value);
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          className={classes.datetimePicker}
          label="End Date & Time"
          type="datetime-local"
          value={event.endDate}
          onChange={(e) => {
            if (e.target.value < event.startDate) {
              window.alert("The event's end time must come after it's start time.");
            } else {
              endDateHandler(e.target.value);
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
      </div>
    </form>
  );
  return renderForm();
};

eventForm.propTypes = propTypes;

export default withStyles(
  styles,
  { withTheme: true },
)(eventForm);
