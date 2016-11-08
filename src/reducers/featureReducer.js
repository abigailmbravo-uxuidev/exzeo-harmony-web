import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function featureReducer(state = initialState.features, action) {
  switch (action.type) {
    default:
      return state;
  }
}
