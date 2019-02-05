import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  withRouter
} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AddIcon from '@material-ui/icons/Add';
import {
  firebase,
  firestore,
  storage
} from '../../../modules/firebase';
import EventForm from './forms/EventForm';
import FoodForm from './forms/FoodForm';
import ImageForm from './forms/ImageForm';
import styles from './Layout.styles';

class EventsLayout extends Component {
  state = {
    showDialog: false,
    activeStep: 0,
    disableNext: true,
    file: null,
    event: {
      title: 'Event Title',
      description: 'Event Description',
      startDate: moment().format('YYYY-MM-DDTHH:mm'),
      endDate: moment().format('YYYY-MM-DDTHH:mm'),
      eventOf: this.props.user.uid,
      tags: [],
      allergies: [],
      imagePath: ""
    }
  };

  handlers = {
    handleChange: key => value => {
      this.setState({ [key]: value });
    },
    handleEventChange: key => value => {
      this.setState((state, props) => ({
        event: {
          ...state.event,
          [key]: value
        }
      }))
    },
    submit: () => {
      const { user } = this.props;
      const { file, event } = this.state;

      // First upload the file to get the filepath.
      storage.doUploadFiles(user.uid, file)
        .then(snapshot => {
          console.log(`[EventLayout] Uploaded ${file.name}`);
          console.log('[EventLayout] Uploading event...'); 
          const doc = {
            ...event,
            startDate: new firebase.firestore.Timestamp.fromMillis(moment(event.startDate).valueOf()),
            endDate: new firebase.firestore.Timestamp.fromMillis(moment(event.endDate).valueOf()),
            eventOf: user.uid,
            imagePath: snapshot.ref.fullPath
          };
          // Then, add the event to the list of events.
          firestore.doAddEventToEvents(doc)
            .then((eventRef) => {
              const eventID = eventRef.id;
              const uid = user.uid;
              console.log(`[EventsLayout] Added event(${eventID})`);
              // Finally, create or update the document of events that belong to a user.
              firestore.doGetEventIDsForUID(uid)
                .then(snapshot => {
                  const onSuccessCallback = () => {
                    console.log(`[EventsLayout] Added event(${eventID}) to user(${uid})`);
                    this.setState({ showDialog: false });
                  }
                  const onErrorCallback = (error) => {
                    console.log(`[EventsLayout] ${JSON.stringify(error)}`);
                    switch (error.code) {
                      case 'not-found': firestore.doAddEventIDsForUID(eventID, uid);
                        break;
                      default: console.log(`[EventsLayout] Unhandled: ${error.code}`);
                    }
                  }
                  if (snapshot.data()) {
                    console.log(snapshot.data());
                    firestore.doUpdateEventIDsForUID(eventID, uid)
                      .then(onSuccessCallback)
                      .catch(onErrorCallback);
                  }
                  else {
                    firestore.doAddEventIDsForUID(eventID, uid)
                      .then(onSuccessCallback)
                      .catch(onErrorCallback)
                  }
                });

            })
        .catch(error => console.log(`[EventsLayout] ${error.message}`))
        .finally(() => {
          this.handlers.handleChange('activeStep')(0);
          this.handlers.handleChange('showDialog')(false);
        });
      })
    }
  };

  renderEventCards() {
    const { events } = this.props;
    const eventCardList = events.eventIDs
      ? events.eventIDs.map(eid => (
        <span>{eid}</span>
      ))
      : null
    return eventCardList;
  }

  renderEventForm() {
    const { event } = this.state;
    const { handleEventChange } = this.handlers;

    const props = {
      event,
      titleHandler: handleEventChange('title'),
      descriptionHandler: handleEventChange('description'),
      startDateHandler: handleEventChange('startDate'),
      endDateHandler: handleEventChange('endDate')
    };
    return <EventForm {...props} />;
  }

  renderFoodForm() {
    const props = {
      event: this.state.event,
      tagsHandler: this.handlers.handleEventChange('tags'),
      allergiesHandler: this.handlers.handleEventChange('allergies')
    };
    return <FoodForm {...props} />;
  }

  renderImageForm() {
    const props = {
      imageURLs: this.state.event.imageURLs,
      fileHandler: this.handlers.handleChange('file'),
      deleteImage: this.handlers.deleteImage
    };
    return <ImageForm {...props} />;
  }

  renderDialog() {
    const { classes } = this.props;
    const {
      handleChange,
      submit
    } = this.handlers;
    const {
      event,
      file,
      activeStep
    } = this.state;
    const handleNext = () => this.setState((state, props) => ({ activeStep: state.activeStep + 1 }));
    const handleBack = () => this.setState((state, props) => ({ activeStep: state.activeStep - 1 }));
    const steps = [
      { label: 'Event', component: () => this.renderEventForm() },
      { label: 'Food', component: () => this.renderFoodForm() },
      { label: 'Images', component: () => this.renderImageForm() }
    ];
    let disableNext = true;
    switch (steps[activeStep].label) {
      case 'Event':
        disableNext = !(event.title && event.description && event.startDate && event.endDate);
        break;
      case 'Food':
        disableNext = false;
        break;
      case 'Images':
        disableNext = file === null;
        break;
      default:
    }
    const stepper = (
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel> 
          </Step>
        ))}
      </Stepper>
    );
    const dialog = (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={this.state.showDialog}
        onClose={() => handleChange('showDialog')(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent
          className={classes.dialogContent}>
          {stepper}
          {steps[activeStep].component()}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          > Back
          </Button>
          {
            activeStep === steps.length - 1
              ? (<Button
                   disabled={disableNext}
                   onClick={() => {
                     submit();
                     handleChange('showDialog')(false);
                   }}
                 > Finish
                 </Button>)
              : (<Button
                   disabled={disableNext}
                   onClick={handleNext}
                 > Next
                 </Button>)
          }

        </DialogActions>
      </Dialog>
    );
    return dialog;
  }

  render() {
    const { classes } = this.props;
    const { handleChange } = this.handlers;

    return (
      <div className={classes.layout}>
        <div className="EventLayoutContent">
          {this.renderEventCards()}
          {this.renderDialog()}
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="Add"
            onClick={() => handleChange('showDialog')(true)}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

EventsLayout.defaultProps = {
  events: []
};
EventsLayout.propTypes = {
  user: PropTypes.object.isRequired,
  events: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(
  styles,
  { withTheme: true }
)(withRouter(EventsLayout));
