import uuidv1 from 'uuid/v1';

import { storage } from './firebase';

/**
 * Puts the file on Firebase Storage at the given path.
 * @returns {firebase.firestore.UploadTask}
 * @param {string} path
 * @param {File} file
 */
export const uploadImage = (path, file) => {
  const fileName = `${uuidv1()}.${file.name.split('.').pop(1)}`;
  const fileRef = storage.ref(`${path}/${fileName}`);
  return fileRef.put(file);
};

/**
 * Wrapper for firebase.storage.Reference.getDownloadURL.
 * @returns {firebase.Promise} Contains the download URL.
 * @param {string} path
 */
export const getDownloadURL = path => storage.ref(path).getDownloadURL();

/**
 * Wrapper for firebase.storage.Reference.delete. Deletes the file stored at path.
 * @returns {firebase.Promise} Contains void.
 * @param {string} path
 */
export const deleteImage = path => storage.ref(path).delete();
