import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return setAgents(state, action);
    case persistTypes.REHYDRATE:
      return action.payload && action.payload.list
        ? action.payload.list
        : initialState.list;
    default:
      return state;
  }
}

function setAgents(state, action) {
  const agents = Array.isArray(action.agents)
    ? action.agents.map(o => ({
        label: `${o.firstName} ${o.lastName}`,
        answer: o.agentCode,
        emailAddress: o.emailAddress
      }))
    : [];
  return {
    ...state,
    agents
  };
}
