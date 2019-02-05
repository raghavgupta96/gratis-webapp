import { combineReducers } from 'redux';
import { userReducer } from './user';
import { eventsReducer } from './events';

const initialState = { };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  rootReducer,
  userReducer,
  eventsReducer
});