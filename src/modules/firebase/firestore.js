import firebase, { db } from './firebase';

const rootCollections = {
  Events: 'Events',
  Users: 'Users',
};

/**
 * Calls callback on snapshots of the user's document.
 * @param {string} uid
 * @param {function(firebase.firestore.DocumentSnapshot)} callback
 */
export const onUserSnapshot = (uid, callback) => (
  db.collection(rootCollections.Users).doc(uid).onSnapshot(callback)
);

/**
 * Calls callback on snapshots of the user's events.
 * @param {string} uid
 * @param {function(firebase.firestore.QuerySnapshot)} callback
 */
export const onEventsOfUserSnapshot = (uid, callback) => {
  const field = 'eventOf';
  const query = db.collection(rootCollections.Events).where(field, '==', uid);
  return query.onSnapshot(callback);
};

/**
 * A transaction that adds an event to the Events collection and updates the users eventIDs.
 * @returns {Promise} Promise returned by updateFunction.
 * @param {string} uid
 * @param {object} event
 */
export const addEventToUser = (uid, event) => {
  const eventsRef = db.collection(rootCollections.Events).doc();
  const userDocRef = db.collection(rootCollections.Users).doc(uid);

  // https://firebase.google.com/docs/reference/js/firebase.firestore.Transaction
  return db.runTransaction(transaction => (
    // Add the event document,
    transaction
      .get(userDocRef)
      .then(() => {
        transaction
          .set(eventsRef, event)
          .update(userDocRef, {
            eventIDs: firebase.firestore.FieldValue.arrayUnion(eventsRef.id),
          });
      })
  ));
};

/**
 * Updates an event doc.
 * @returns Promise containing void.
 * @param {string} eventID
 * @param {Object} event Event document.
 */
export const updateEvent = (eventID, event) => (
  db.collection(rootCollections.Events).doc(eventID).update(event)
);

/**
 * Updates a user's doc.
 * @returns Promise containing void.
 * @param {string} uid
 */
export const updateUser = (uid, user) =>  {
  db.collection(rootCollections.Users).doc(uid).update(user);
};

/**
 * A transaction that deletes an event and updates the event's of a user.
 * @returns Promise returned by updateFunction.
 * @param {string} eventID
 * @param {string} uid
 */
export const deleteEventOfUser = (eventID, uid) => {
  const eventDocRef = db.collection(rootCollections.Events).doc(eventID);
  const userDocRef = db.collection(rootCollections.Users).doc(uid);

  return db.runTransaction(transaction => (
    // Add the event document,
    transaction
      .get(userDocRef)
      .then((userDoc) => {
        const eventIDs = userDoc.get('eventIDs');

        transaction
          .delete(eventDocRef)
          .update(userDocRef, {
            eventIDs: eventIDs.filter(id => id !== eventDocRef.id),
          });
      })
  ));
};
