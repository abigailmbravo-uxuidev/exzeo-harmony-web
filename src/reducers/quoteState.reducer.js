import * as types from '../actions/actionTypes';

import initialState from './initialState';


function setQuote(state, action) {
  return {
    ...state,
    quote: action.quote
  };
}


export default function quoteReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.SET_QUOTE:
      return setQuote(state, action);
    default:
      return state;
  }
}

