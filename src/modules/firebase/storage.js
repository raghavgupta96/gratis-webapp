import uuidv1 from 'uuid/v1';
import { storage } from './firebase';

export const uploadImage = (path, file) => {
  const fileName = `${uuidv1()}.${file.name.split('.').pop(1)}`;
  const fileRef = storage.ref(`${path}/${fileName}`);
  return fileRef.put(file);
};

export const getDownloadURL = (path) => {
  return storage.ref(path).getDownloadURL();
}

export const deleteImage = path => storage.ref(path).delete();
