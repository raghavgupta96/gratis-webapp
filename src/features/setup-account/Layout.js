import React, { Component } from 'react';
import {
  object,
  shape,
  string,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { firestore } from '../../modules/firebase';
import styles from './Layout.styles';

/** Container seen by first-time, authenticated users. */
class SetupAccountLayout extends Component {
  static propTypes = {
    classes: shape({
      container: string,
      layout: string,
      form: string,
      actions: string,
      grow: string,
    }).isRequired,
    user: object.isRequired,
  }

  state = {
    disableNext: true,
    activeStep: 0,
    steps: [
      { id: 'Identification', label: 'Tell us about yourself.', component: () => this.renderIdentificationForm() },
      { id: 'Restaurant', label: 'Tell us about your restaurant.', component: () => this.renderRestaurantForm() },
      { id: 'Location', label: 'Where is your restaurant?', component: () => this.renderLocationForm() },
    ],
    user: {
      name: '',
      cuisine: '',
      area: '',
      address: '',
      operationalHours: '',
      file: null,
    },
  }

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
    handleUserChange: key => value => this.setState((state) => {
      const {
        activeStep,
        steps,
        user,
      } = this.state;

      let disableNext = false;
      if (activeStep !== steps.length - 1) {
        switch (steps[activeStep + 1].label) {
          case 'Restaurant':
            disableNext = user.cuisine !== '' && user.operationaHours !== '';
            break;
          case 'Location':
            disableNext = user.area !== '' && user.address !== '';
            break;
          default:
            break;
        }
      }

      return {
        disableNext,
        user: {
          ...state.user,
          [key]: value,
        },
      };
    }),
    handleNext: () => this.setState((state) => {
      const {
        activeStep,
        user,
        steps,
      } = state;

      // TODO: This is repeated code (see line this.handlers.handleBack). DRY.
      let disableNext = false;
      switch (steps[activeStep + 1].label) {
        case 'Restaurant':
          disableNext = user.cuisine !== '' && user.operationaHours !== '';
          break;
        case 'Location':
          disableNext = user.area !== '' && user.address !== '';
          break;
        default:
          break;
      }

      return {
        disableNext,
        activeStep: state.activeStep + 1,
      };
    }),
    handleBack: () => this.setState((state) => {
      const {
        activeStep,
        user,
        steps,
      } = state;

      // TODO: This is repeated code (see line this.handlers.handleNext). DRY.
      let disableNext = false;
      switch (steps[activeStep - 1].label) {
        case 'Identification':
          disableNext = user.name !== '';
          break;
        case 'Restaurant':
          disableNext = user.cuisine !== '' && user.operationalHours !== '';
          break;
        default:
          break;
      }

      return {
        disableNext,
        activeStep: state.activeStep - 1,
      };
    }),
    updateUser: () => {
      const { uid } = this.props.user;
      const { user } = this.state;
      firestore.updateUser(uid, user);
    },
  }

  renderIdentificationForm() {
    const { classes } = this.props;
    const { user } = this.state;
    const { handleUserChange } = this.handlers;

    return (
      <form className={classes.form}>
        <TextField
          label="Name"
          value={user.name}
          onChange={e => handleUserChange('name')(e.target.value)}
        />
      </form>
    );
  }

  renderRestaurantForm() {
    const { classes } = this.props;
    const { user } = this.state;
    const { handleUserChange } = this.handlers;

    return (
      <form className={classes.form}>
        <TextField
          label="Cuisine"
          value={user.cuisine}
          onChange={e => handleUserChange('cuisine')(e.target.value)}
        />
        <TextField
          label="Operational Hours"
          value={user.operationalHours}
          onChange={e => handleUserChange('operationalHours')(e.target.value)}
        />
      </form>
    );
  }

  renderLocationForm() {
    const { classes } = this.props;
    const { user } = this.state;
    const { handleUserChange } = this.handlers;

    return (
      <form className={classes.form}>
        <TextField
          label="Area"
          value={user.area}
          onChange={e => handleUserChange('area')(e.target.value)}
        />
        <TextField
          label="Address"
          value={user.address}
          onChange={e => handleUserChange('address')(e.target.value)}
        />
      </form>
    );
  }

  renderActions() {
    const { classes } = this.props;
    const {
      disableNext,
      activeStep,
      steps,
    } = this.state;
    const {
      handleNext,
      handleBack,
      updateUser,
    } = this.handlers;

    const backButton = activeStep === 0
      ? (
        <div className={classes.grow} />
      ) : (
        <Button
          onClick={() => handleBack()}
        >
          Back
        </Button>
      );

    const nextButton = activeStep < steps.length - 1
      ? (
        <Button
          onClick={() => handleNext()}
          disabled={disableNext}
        >
          Next
        </Button>
      ) : (
        <Button
          onClick={() => updateUser()}
          disabled={disableNext}
        >
          Finish
        </Button>
      );

    return (
      <div className={classes.actions}>
        {backButton}
        {nextButton}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const {
      steps,
      activeStep,
    } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.layout}>
          <Typography variant="h4" gutterBottom>
            {steps[activeStep].label}
          </Typography>
          {steps[activeStep].component()}
          {this.renderActions()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SetupAccountLayout);
