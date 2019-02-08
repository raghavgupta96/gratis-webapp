import React, { Component } from 'react'; import moment from 'moment';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EventForm from './forms/EventForm';
import FoodForm from './forms/FoodForm';
import ImageForm from './forms/ImageForm';
import styles from './Dialog.styles';

class eventDialog extends Component {
  state = {
    activeStep: 0,
    disableNext: true,
    event: {
      title: '',
      description: '',
      startDate: moment().format('YYYY-MM-DDTHH:mm'),
      endDate: moment().format('YYYY-MM-DDTHH:mm'),
      eventOf: this.props.user.uid,
      tags: [],
      allergies: [],
      imagePath: "",
      file: null
    },
    steps: [
      { label: 'Event', component: () => this.renderEventForm() },
      { label: 'Food', component: () => this.renderFoodForm() },
      { label: 'Images', component: () => this.renderImageForm() }
    ]
  };

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
    handleEventChange: key => value => {
      this.setState((state, props) => {
        const {
          steps,
          activeStep
        } = state;
        const event = {
          ...state.event,
          [key]: value
        };
        let disableNext = true;
        switch (steps[activeStep].label) {
          case 'Event':
            disableNext = !(event.title && event.description && event.startDate && event.endDate);
            break;
          case 'Food':
            disableNext = false;
            break;
          case 'Images':
            disableNext = event.file === null;
            break;
          default:
        }
        return {
          ...state,
          event,
          disableNext
        }
      })
    },
    handleNext: () => {
      const {
        event,
        steps,
        activeStep
       } = this.state;
      let disableNext = true;
      switch (steps[activeStep + 1].label) {
        case 'Event':
          disableNext = !(event.title && event.description && event.startDate && event.endDate);
          break;
        case 'Food':
          disableNext = false;
          break;
        case 'Images':
          disableNext = event.file === null;
          break;
        default:
      }
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        disableNext
      }))
     
    },
    handleBack: () => this.setState((state, props) => ({ activeStep: state.activeStep - 1 }))
  }

  componentDidMount() {
    const { event } = this.props;
    const {
      steps,
      activeStep
    } = this.state;
    if (event) {
      let disableNext = true;
      switch (steps[activeStep].label) {
        case 'Event':
          disableNext = !(event.title && event.description && event.startDate && event.endDate);
          break;
        case 'Food':
          disableNext = false;
          break;
        case 'Images':
          disableNext = event.file === null;
          break;
        default:
      }
      this.setState({
        event,
        disableNext
      });
    }
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
    const { event } = this.state;
    const disableNext = event.file === null;

    const props = {
      imageURLs: this.state.event.imageURLs,
      fileHandler: this.handlers.handleEventChange('file'),
      deleteImage: this.handlers.deleteImage,
      disableNext
    };
    return <ImageForm {...props} />;
  }

  renderStepper() {
    const {
      activeStep,
      steps
    } = this.state;

    return (
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel> 
          </Step>
        ))}
      </Stepper>
    );
  }

  render() {
    const {
      classes,
      submit,
      open,
      onClose
    }  = this.props;
    const {
      handleNext,
      handleBack
    } = this.handlers;
    const {
      activeStep,
      disableNext,
      steps,
      event
    } = this.state;
   const dialog = (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
      >
        <DialogContent
          className={classes.dialogContent}>
          {this.renderStepper()}
          {steps[activeStep].component()}
        </DialogContent>
        <DialogActions>
          {
            activeStep === 0
              ? (<Button
                   disabled={activeStep !== 0}
                   onClick={onClose}
                 > Cancel
                 </Button>)
              : (<Button
                   onClick={handleBack}
                 > Back
                 </Button>)
          }
          {
            activeStep === steps.length - 1
              ? (<Button
                   disabled={disableNext}
                   onClick={() => {
                     const doc = {
                       ...event
                     };
                     const { file } = doc;
                     delete doc.file;
                     submit(doc, file);
                     onClose();
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
}

export default withStyles(
  styles,
  { withTheme: true}
)(eventDialog);
