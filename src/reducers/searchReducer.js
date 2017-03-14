import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case types.CLEAR_SEARCH_CONFIG:
      return state.remove('config');

    case types.SET_SEARCH_CONFIG:
      return state.set('config', action.config);

    default:
      return state;
  }
}
