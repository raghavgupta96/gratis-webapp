/**
 * Returns an action creator whose handler is assignment of args to argNames.
 * @param {string} type
 * @param  {...string} argNames
 */
export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};

/**
 * Returns a reducer given an initial state and handlers.
 * @param {*} initialState
 * @param {Object} handlers Object of functions
 */
export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  }
  return state;
};
