import { makeActionCreator, createReducer } from '../utils';

const initialState = {
  eventIDs: null
};

const eventsActionTypes = {
  SET_EVENTS: 'SET_EVENTS'
};

// Handlers
const setEvents = (state = initialState, action) => {
  return action.events;
}

// Create the reducer from the initial state and actions.
const eventsReducer = createReducer(initialState, {
  [eventsActionTypes.SET_EVENTS]: setEvents
});

export {
  eventsActionTypes,
  eventsReducer
};
