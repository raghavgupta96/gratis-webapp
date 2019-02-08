import firebase, { db } from './firebase';

// Get Events
export const doGetUser = (uid) => {
  const userRef = db.collection('Users').doc(uid);
  return userRef;
};

export const doAddEvent = (event) => {
  const eventsRef = db.collection('Events');
  return eventsRef.add(event);
};

export const doGetEvent = (eid) => {
  const eventRef = db.collection('Events').doc(eid);
  return eventRef.get();
};

export const doGetEventsOfUser = (uid) => {
  const eventsRef = db.collection('Events').where('eventOf', '==', uid);
  return eventsRef;
};

export const doUpdateUserEventIDs = (eventID, uid) => {
  const uidRef = db.collection('Users').doc(uid);

  return uidRef.update({
    eventIDs: firebase.firestore.FieldValue.arrayUnion(eventID)
  });
};

export const doAddUserEventIDs = (eventID, uid) => {
  const uidRef = db.collection('Users').doc(uid);

  return uidRef.set({ eventIDs: [eventID] });
};

export const deleteEvent = eventId => db.collection('Events').doc(eventId).delete();

export const deleteEventOfUser = (eventId, userId) => {
  db
    .collection('Users')
    .doc(userId)
    .get()
    .then(snapshot => {
      const user = snapshot.data();
      db
        .collection('Users')
        .doc(userId)
        .update({
          eventIDs: user.eventIDs.filter(id => id !== eventId)
        });
    })
};

export const updateEvent = (eventId, event) => {
  db
    .collection('Events')
    .doc(eventId)
    .update(event);
};
