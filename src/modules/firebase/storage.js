import uuidv1 from 'uuid/v1';
import { storage } from './firebase';

export const doUploadFiles = (path, file) => {
  const fileName = `${uuidv1()}.${file.name.split('.').pop(1)}`;
  const fileRef = storage.ref(`${path}/${fileName}`);
  return fileRef.put(file);
};

export const doDeleteFiles = (storage, name) => storage.ref().child(`${storage}/${name}`).delete();
