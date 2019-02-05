import { createReducer } from '../utils';

const initialState = null

const userActionTypes = {
  SET_USER: 'SET_USER'
};

// Handlers
const setUser = (state = initialState, action) => {
  return action.user;
};

// Create the reducer from the initial state and actions.
const userReducer = createReducer(initialState, {
  [userActionTypes.SET_USER]: setUser
});

export {
  userActionTypes,
  userReducer
};
