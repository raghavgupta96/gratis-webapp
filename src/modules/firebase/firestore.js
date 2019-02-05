import firebase, { db } from './firebase';

// Get Events
export const doGetEventIDsForUID = (uid) => {
  const eventIDsRef = db.collection('Users').doc(uid);
  return eventIDsRef.get();
};

// Add event
// returns promise
export const doAddEventToEvents = (event) => {
  const eventsRef = db.collection('Events');
  return eventsRef.add(event);
};

// Get event
// returns promise
export const getEventFromEvents = (eid) => {
  const eventRef = db.collection('Events').doc(eid);
  return eventRef.get();
};

export const getEventsForUID = (uid) => {
  const eventsRef = db.collection('Events').where('eventOf', '==', uid);
  return eventsRef;
};

export const getEventsOfUID = (uid) => {
  const docRef = db.collection('Users').doc(uid);
  return docRef;
};

// Remove event
// returns promise

// Add eventID to user/eventIDs
// returns promise
export const doUpdateEventIDsForUID = (eventID, uid) => {
  const uidRef = db.collection('Users').doc(uid);

  return uidRef.update({
    eventIDs: firebase.firestore.FieldValue.arrayUnion(eventID)
  });
};

// Add eventIDs to user
export const doAddEventIDsForUID = (eventID, uid) => {
  const uidRef = db.collection('Users').doc(uid);

  return uidRef.set({ eventIDs: [eventID] });
};
