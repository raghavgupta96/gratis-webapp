import { createReducer } from '../utils';

const userActionTypes = {
  SET_USER: 'SET_USER',
};

// Define an initial state.
const initialState = { };

// Action handlers.
const setUser = (_, action) => action.user;

// Create the reducer from the initial state and actions.
const userReducer = createReducer(initialState, {
  [userActionTypes.SET_USER]: setUser,
});

export {
  userActionTypes,
  userReducer,
};
