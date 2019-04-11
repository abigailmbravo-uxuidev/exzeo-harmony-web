import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';


function setQuote(state, action) {
  return {
    ...state,
    quote: action.quote,
    state: action.state
  };
}


export default function quoteReducer(state = initialState.quoteState, action) {
  switch (action.type) {
    case types.SET_QUOTE:
      return setQuote(state, action);
    case persistTypes.REHYDRATE: {
      const quote = (action.quoteState) ? action.quoteState : null;
      return quote || ((action.payload && action.payload.quoteState) ? action.payload.quoteState : state);
    }
    default:
      return state;
  }
}

