import * as types from '../actions/actionTypes';

import initialState from './initialState';


function createQuote(state, action) {
  return {
    ...state,
    quote: action.quote
  };
}

export default function quoteReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.CREATE_QUOTE:
      return createQuote(state, action);
    default:
      return state;
  }
}

