import React, { Component } from 'react'; import moment from 'moment';
import {
  object,
  shape,
  bool,
  string,
  func,
} from 'prop-types';
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

/** Dialog for creating or editing events.  */
class eventDialog extends Component {
  static propTypes = {
    classes: shape({
      dialogPaper: string,
      dialogContent: string,
    }).isRequired,
    user: object.isRequired,
    event: object,
    submit: func.isRequired,
    open: bool.isRequired,
    onClose: func.isRequired,
  };

  static defaultProps = {
    event: {
      title: '',
      description: '',
      startDate: moment().format('YYYY-MM-DDTHH:mm'),
      endDate: moment().format('YYYY-MM-DDTHH:mm'),
      eventOf: '',
      tags: [],
      allergies: [],
      imagePath: '',
      file: null,
    },
  }

  state = {
    activeStep: 0,
    disableNext: true,
    event: { },
    steps: [
      { label: 'Event', component: () => this.renderEventForm() },
      { label: 'Food', component: () => this.renderFoodForm() },
      { label: 'Images', component: () => this.renderImageForm() },
    ],
  };

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
    /** Handles changes in this.state.event, and updates this.state.disableNext. */
    handleEventChange: key => (value) => {
      this.setState((state) => {
        const { activeStep } = state;

        const event = {
          ...state.event,
          [key]: value,
        };
        const disableNext = this.disableNextStep(activeStep, event);
        return {
          ...state,
          event,
          disableNext,
        };
      });
    },
    handleEventFileChange: (file, filepath) => {
      this.setState(state => ({
        event: {
          ...state.event,
          file,
          filepath,
        },
      }));
    },
    /** Sets current step to the next step. */
    handleNext: () => {
      const {
        activeStep,
        event,
      } = this.state;

      const disableNext = this.disableNextStep(activeStep + 1, event);
      this.setState(state => ({
        activeStep: state.activeStep + 1,
        disableNext,
      }));
    },
    /** Sets current step to the previous step. */
    handleBack: () => {
      const {
        event,
        activeStep,
      } = this.state;

      const disableNext = this.disableNextStep(activeStep - 1, event);
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        disableNext,
      }));
    },
  }

  /** When the component mounts, copy the event prop to state if it exists. */
  componentDidMount() {
    const { event } = this.props;
    const { activeStep } = this.state;

    if (event) {
      const disableNext = this.disableNextStep(activeStep, event);
      this.setState({
        event,
        disableNext,
      });
    }
  }

  /**
   * Helper function that returns true or false based on step.
   * @returns {boolean}
   * @param {int} step
   */
  disableNextStep(step, event) {
    const {
      steps,
    } = this.state;

    let disableNext = true;
    switch (steps[step].label) {
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
    return disableNext;
  }

  renderEventForm() {
    const { event } = this.state;
    const { handleEventChange } = this.handlers;

    const props = {
      event,
      titleHandler: handleEventChange('title'),
      descriptionHandler: handleEventChange('description'),
      startDateHandler: handleEventChange('startDate'),
      endDateHandler: handleEventChange('endDate'),
    };
    return <EventForm {...props} />;
  }

  renderFoodForm() {
    const { event } = this.state;
    const { handleEventChange } = this.handlers;

    const props = {
      event,
      tagsHandler: handleEventChange('tags'),
      allergiesHandler: handleEventChange('allergies'),
    };
    return <FoodForm {...props} />;
  }

  renderImageForm() {
    const { filepath } = this.state.event;
    const {
      handleEventFileChange,
      deleteImage,
    } = this.handlers;

    const props = {
      fileHandler: (file, path) => handleEventFileChange(file, path),
      imagePreviewUrl: filepath,
      deleteImage,
    };
    return <ImageForm {...props} />;
  }

  renderStepper() {
    const {
      activeStep,
      steps,
    } = this.state;

    return (
      <Stepper activeStep={activeStep}>
        {steps.map(step => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  }

  renderDialogContent() {
    const { classes } = this.props;
    const {
      activeStep,
      steps,
    } = this.state;

    return (
      <DialogContent
        className={classes.dialogContent}
        ref={ref => this.DialogContent = ref}
      >
        {this.renderStepper()}
        {steps[activeStep].component()}
      </DialogContent>
    );
  }

  renderDialogActions() {
    const {
      submit,
      onClose,
    } = this.props;
    const {
      activeStep,
      disableNext,
      steps,
      event,
    } = this.state;
    const {
      handleNext,
      handleBack,
    } = this.handlers;

    const previousButton = activeStep === 0
      ? (
        <Button
          disabled={activeStep !== 0}
          onClick={onClose}
        >
          Cancel
        </Button>
      ) : (
        <Button
          onClick={handleBack}
        >
          Back
        </Button>
      );
    const nextButton = activeStep === steps.length - 1
      ? (
        <Button
          disabled={disableNext}
          onClick={() => {
            const doc = { ...event };
            const { file } = doc;
            delete doc.file;
            delete doc.filepath;
            submit(doc, file);
            onClose();
          }}
        >
          Finish
        </Button>
      ) : (
        <Button
          disabled={disableNext}
          onClick={handleNext}
        >
          Next
        </Button>
      );
    return (
      <DialogActions>
        {previousButton}
        {nextButton}
      </DialogActions>
    );
  }

  render() {
    const {
      classes,
      open,
      onClose,
    } = this.props;

    const dialog = (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
      >
        {this.renderDialogContent()}
        {this.renderDialogActions()}
      </Dialog>
    );
    return dialog;
  }
}

export default withStyles(styles)(eventDialog);
