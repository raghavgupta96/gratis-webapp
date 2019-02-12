import { auth } from './firebase';
// TODO: Does this really need to be in it's own file?
//       It only encapsulates our use of the firebase.auth.Auth object,
//       but we're essentially just wrapping it's methods.

/** Wrapped methods. */
export const signInWithEmailAndPassword = (...args) => auth.signInWithEmailAndPassword(...args);
export const createUserWithEmailAndPassword = (...args) => (
  auth.createUserWithEmailAndPassword(...args)
);
export const sendPasswordResetEmail = (...args) => auth.sendPasswordResetEmail(...args);
export const onAuthStateChanged = (...args) => auth.onAuthStateChanged(...args);
export const signOut = (...args) => auth.signOut(...args);

export const updatePassword = password => auth.currentUser.updatePassword(password);
