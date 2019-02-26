import React, { Component } from 'react';
import moment from 'moment';
import {
  object,
  shape,
  string,
} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import {
  firebase,
  firestore,
  storage,
} from '../../../modules/firebase';
import EventCard from './Card';
import EventDialog from './Dialog';
import styles from './Layout.styles';

/** Container for using event-related features. */
class EventsLayout extends Component {
  static propTypes = {
    classes: shape({
      layout: string,
      content: string,
      dialogPaper: string,
      fab: string,
    }).isRequired,
    user: object.isRequired,
    events: object.isRequired,
  };

  state = {
    showAddEventDialog: false,
    showEditEventDialog: false,
    showConfirmDeleteDialog: false,
    editEventID: '',
    deleteEventID: '',
  };

  handlers = {
    handleChange: key => value => this.setState({ [key]: value }),
    /**
     * Uploads the file to storage, then adds a document to the Events collection
     * and update's the user's document with the event in a transaction.
     *
     * TODO: How do we make calls to storage and firestore transactional? Cloud functions?
     */
    addEvent: (event, file) => {
      const { user } = this.props;

      // There really is no transactional way to upload images and update firestore...
      // https://stackoverflow.com/questions/47740838/couple-firebase-firestore-and-firebase-storage-calls-together-into-a-batch
      //
      // First upload the file to get the filepath.
      const { uid } = user;
      storage
        .uploadImage(uid, file)
        .then((snapshot) => {
          // Then, add the event to the list of events.
          const FromMillis = firebase.firestore.Timestamp.fromMillis;
          const doc = {
            ...event,
            startDate: new FromMillis(moment(event.startDate).valueOf()),
            endDate: new FromMillis(moment(event.endDate).valueOf()),
            eventOf: uid,
            imagePath: snapshot.ref.fullPath,
            code: (Math.floor(Math.random() * 10000) + 1000).toString(),
          };
          firestore
            .addEventToUser(uid, doc)
            .then(() => this.setState({ showAddEventDialog: false }));
        });
    },
    /**
     * Deletes the old event image, uploads the new event image,
     * then updates the event document.
     */
    editEvent: (event, file) => {
      const {
        user,
        events,
      } = this.props;
      const { editEventID } = this.state;

      storage
        .deleteImage(events[editEventID].storagePath)
        .then(() => {
          storage
            .uploadImage(user.uid, file)
            .then((snapshot) => {
              const FromMillis = firebase.firestore.Timestamp.fromMillis;
              const doc = {
                ...event,
                startDate: new FromMillis(moment(event.startDate).valueOf()),
                endDate: new FromMillis(moment(event.endDate).valueOf()),
                eventOf: user.uid,
                imagePath: snapshot.ref.fullPath,
              };
              firestore
                .updateEvent(editEventID, doc)
                .then(() => this.setState({ showAddEventDialog: false }));
            });
        });
    },
  };

  renderEventCards() {
    const {
      events,
    } = this.props;
    const {
      handleChange,
    } = this.handlers;

    const eventCardList = [];
    Object.keys(events).forEach((key) => {
      const props = {
        key,
        event: events[key],
        deleteEvent: () => {
          handleChange('deleteEventID')(key);
          handleChange('showConfirmDeleteDialog')(true);
        },
        editEvent: () => {
          this.setState({
            showEditEventDialog: true,
            editEventID: key,
          });
        },
      };
      eventCardList.push(<EventCard {...props} />);
    });
    return eventCardList;
  }

  renderConfirmDeleteDialog() {
    const {
      user,
      events,
    } = this.props;
    const {
      showConfirmDeleteDialog,
      deleteEventID,
    } = this.state;
    const {
      handleChange,
    } = this.handlers;

    return (
      <Dialog
        open={showConfirmDeleteDialog}
        onClose={() => handleChange('showConfirmDeleteDialog')(false)}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          Are you sure you want to delete &quot;
          {events[deleteEventID].title}
          &quot;?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              storage.deleteImage(events[deleteEventID].storagePath);
              firestore.deleteEventOfUser(deleteEventID, user.uid);
            }}
          >
          Yes, delete the event
          </Button>
          <Button
            onClick={() => {
              handleChange('showConfirmDeleteDialog')(false);
            }}
          >
          Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderAddEventDialog() {
    const { user } = this.props;
    const { showAddEventDialog } = this.state;
    const {
      handleChange,
      addEvent,
    } = this.handlers;

    const props = {
      user,
      open: showAddEventDialog,
      submit: addEvent,
      onClose: () => handleChange('showAddEventDialog')(false),
    };
    return <EventDialog {...props} />;
  }

  renderEditEventDialog() {
    const {
      user,
      events,
    } = this.props;
    const {
      editEventID,
      showEditEventDialog,
    } = this.state;
    const {
      handleChange,
      editEvent,
    } = this.handlers;

    const event = { ...events[editEventID] };
    event.startDate = moment().format('YYYY-MM-DDTHH:mm');
    event.endDate = moment().format('YYYY-MM-DDTHH:mm');
    const props = {
      event,
      user,
      open: showEditEventDialog,
      onClose: () => handleChange('showEditEventDialog')(false),
      submit: editEvent,
    };
    return <EventDialog {...props} />;
  }

  render() {
    const { classes } = this.props;
    const {
      showAddEventDialog,
      showEditEventDialog,
      showConfirmDeleteDialog,
    } = this.state;
    const { handleChange } = this.handlers;

    return (
      <div className={classes.layout}>
        <div className={classes.content}>
          {this.renderEventCards()}
          <div className={classes.fade} />
          {showAddEventDialog
            ? this.renderAddEventDialog()
            : null}
          {showEditEventDialog
            ? this.renderEditEventDialog()
            : null}
          {showConfirmDeleteDialog
            ? this.renderConfirmDeleteDialog()
            : null}
          <Fab
            className={classes.fab}
            color="primary"
            aria-label="Add"
            onClick={() => handleChange('showAddEventDialog')(true)}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EventsLayout);
