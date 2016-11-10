import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function featureReducer(state = initialState.features, action) {
  switch (action.type) {
    case types.INITIALIZELD:
      return state.set('ld-started', true);

    case types.TOGGLE_FEATURE:
      return state.set(action.feature.featureName, action.feature.value);

    default:
      return state;
  }
}
