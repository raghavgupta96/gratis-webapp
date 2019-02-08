import { createReducer } from '../utils';

const initialState = { };

const eventsActionTypes = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT'
};

// Handlers
const setEvents = (state = initialState, action) => {
  return action.events;
}

const addEvent = (state = initialState, action) => {
  const nextState = {
    ...state,
    [action.event.eventID]: action.event.event
  };
  return nextState;
}

// Create the reducer from the initial state and actions.
const eventsReducer = createReducer(initialState, {
  [eventsActionTypes.SET_EVENTS]: setEvents,
  [eventsActionTypes.ADD_EVENT]: addEvent
});

export {
  eventsActionTypes,
  eventsReducer
};
