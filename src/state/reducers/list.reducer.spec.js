import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';
import listReducer from './list.reducer';

describe('List Reducer', () => {
  it('should call list reducer SET AGENTS with no agents', () => {
    const state = initialState.list;
    const action = {
      type: types.SET_AGENTS,
      agents: null
    };

    const result = {
      ...initialState.list,
      agents: []
    };

    expect(listReducer(state, action)).toEqual(result);
  });

  it('should call list reducer SET AGENTS with agents', () => {
    const state = initialState.list;
    const action = {
      type: types.SET_AGENTS,
      agents: [
        {
          firstName: 'Test',
          lastName: 'McTester',
          agentCode: 1000,
          emailAddress: 'test@test.com'
        }
      ]
    };

    const result = {
      ...initialState.list,
      agents: [
        { label: 'Test McTester', answer: 1000, emailAddress: 'test@test.com' }
      ]
    };

    expect(listReducer(state, action)).toEqual(result);
  });
});
