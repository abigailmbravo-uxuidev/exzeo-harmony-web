import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function detailsReducer(state = initialState.details, action) {
  switch (action.type) {
    case types.SET_DETAILS:
      console.log('SET_DETAILS', types, state, action);

      return state.set('details', action.details);

    case types.GET_DETAILS:
      console.log('GET_DETAILS', types, state, action);

      return state;

    default:
      return state;
  }
}
