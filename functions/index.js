const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/**
 * Creates a dummy document on the 'Users' collection whenever a new user is created.
 */
exports.createDummyUserDocument = functions.auth.user().onCreate((user) => {
  const document = {
    cuisine: '',
    userName: '',
    operationalHours: '',
    area: '',
    eventIDs: [],
    defaultAddress: '',
  };

  admin.firestore().doc(`Users/${user.uid}`).set(document);
});