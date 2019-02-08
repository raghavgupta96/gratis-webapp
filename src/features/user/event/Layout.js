import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  firebase,
  firestore,
  storage
} from '../../../modules/firebase';
import EventCard from './Card';
import EventDialog from './Dialog';
import styles from './Layout.styles';

class EventsLayout extends Component {
  state = {
    showAddEventDialog: false,
    showEditEventDialog: false,
    editEventID: ""
  };

  handlers = {
    handleChange: key => value => {
      this.setState({ [key]: value });
    },
    addEvent: (event, file) => {
      const { user } = this.props;

      // First upload the file to get the filepath.
      storage
        .uploadImage(user.uid, file)
        .then(snapshot => {
          console.log(`[EventLayout] Uploaded ${file.name}`);
          console.log('[EventLayout] Uploading event...'); 
          // Then, add the event to the list of events.
          const doc = {
            ...event,
            startDate: new firebase.firestore.Timestamp.fromMillis(moment(event.startDate).valueOf()),
            endDate: new firebase.firestore.Timestamp.fromMillis(moment(event.endDate).valueOf()),
            eventOf: user.uid,
            imagePath: snapshot.ref.fullPath
          };
          firestore
            .doAddEvent(doc)
            .then((eventRef) => {
              // Finally, create or update the document of events that belong to a user.
              const eventID = eventRef.id;
              const uid = user.uid;
              console.log(`[EventsLayout] Added event(${eventID})`);
              const userRef = firestore.doGetUser(uid);
              userRef
                .get()
                .then((snapshot) => {
                  const data = snapshot.data();
                  const onSuccessCallback = () => {
                    console.log(`[EventsLayout] Added event(${eventID}) to user(${uid})`);
                    this.setState({ showDialog: false });
                  }
                  const onErrorCallback = (error) => {
                    console.log(`[EventsLayout] ${JSON.stringify(error)}`);
                    switch (error.code) {
                      default: console.log(`[EventsLayout] Unhandled: ${error.code}`);
                    }
                  }
                  if (data.eventIDs) {
                    firestore
                      .doUpdateUserEventIDs(eventID, uid)
                      .then(onSuccessCallback)
                      .catch(onErrorCallback);
                  }
                  else {
                    firestore
                      .doAddUserEventIDs(eventID, uid)
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
        });;
    },
    editEvent: (event, file) => {
      const {
        user,
        events
      } = this.props;
      const { editEventID } = this.state;
      storage
        .deleteImage(events[editEventID].storagePath)
        .then(() => {
          storage
            .uploadImage(user.uid, file)
            .then(snapshot => {
              console.log(`[EventLayout] Uploaded ${file.name}`);
              console.log('[EventLayout] Uploading event...'); 
              // Then, update event
              const doc = {
                ...event,
                startDate: new firebase.firestore.Timestamp.fromMillis(moment(event.startDate).valueOf()),
                endDate: new firebase.firestore.Timestamp.fromMillis(moment(event.endDate).valueOf()),
                eventOf: user.uid,
                imagePath: snapshot.ref.fullPath
              };
              firestore
                .updateEvent(editEventID, doc);
            });
        });
    }
  };

  renderEventCards() {
    const {
      user,
      events
    } = this.props;
    const eventCardList = [];

    for (let key of Object.keys(events)) {
      const props = {
        key,
        event: events[key],
        deleteEvent: () => {
          storage.deleteImage(events[key].storagePath);
          firestore.deleteEvent(key);
          firestore.deleteEventOfUser(key, user.uid);
        },
        editEvent: () => {
          this.setState({
            showEditEventDialog: true,
            editEventID: key
          });
        }
      };
      eventCardList.push(
        <EventCard { ...props } />
      );
    }
    return eventCardList;
  }

  renderAddEventDialog() {
    const { handleChange } = this.handlers;
    const props = {
      user: this.props.user,
      open: this.state.showAddEventDialog,
      onClose: () => handleChange('showAddEventDialog')(false),
      submit: this.handlers.addEvent
    }
    return <EventDialog { ...props } />;
  }

  renderEditEventDialog() {
    const { handleChange } = this.handlers;
    const event = {
      ...this.props.events[this.state.editEventID]
    };
    event.startDate = moment().format('YYYY-MM-DDTHH:mm');
    event.endDate = moment().format('YYYY-MM-DDTHH:mm');
    const props = {
      event,
      user: this.props.user,
      open: this.state.showEditEventDialog,
      onClose: () => handleChange('showEditEventDialog')(false),
      submit: this.handlers.editEvent
    }
    return <EventDialog { ...props } />;

  }

  render() {
    const { classes } = this.props;
    const { handleChange } = this.handlers;

    return (
      <div className={classes.layout}>
        <div className={classes.content}>
          {this.renderEventCards()}
          {this.state.showAddEventDialog
            ? this.renderAddEventDialog()
            : null}
          {this.state.showEditEventDialog
            ? this.renderEditEventDialog()
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

EventsLayout.defaultProps = {
  events: {}
};
EventsLayout.propTypes = {
  user: PropTypes.object.isRequired,
  events: PropTypes.object
};

export default withStyles(
  styles,
  { withTheme: true }
)(EventsLayout);
