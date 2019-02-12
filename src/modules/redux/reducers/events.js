import { createReducer } from '../utils';

const eventsActionTypes = {
  SET_EVENTS: 'SET_EVENTS',
  ADD_EVENT: 'ADD_EVENT',
};

// TODO: Define an initial state.
const initialState = { };

// Action handlers.
const setEvents = (_, action) => action.events;

const addEvent = (state = initialState, action) => {
  const nextState = {
    ...state,
    [action.payload.eventID]: action.payload.event,
  };
  return nextState;
};

// Create the reducer from the initial state and actions.
const eventsReducer = createReducer(initialState, {
  [eventsActionTypes.SET_EVENTS]: setEvents,
  [eventsActionTypes.ADD_EVENT]: addEvent,
});

export {
  eventsActionTypes,
  eventsReducer,
};
