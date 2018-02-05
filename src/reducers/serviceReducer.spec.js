import * as types from './../actions/actionTypes';
import initialState from './initialState';
import serviceReducer from './serviceReducer';

describe('searchReducer Reducer', () => {
  it('should call serviceReducer SERVICE_REQUEST', () => {
    const state = initialState.service;
    const inputProps = {};
    const action = {
      type: types.SERVICE_REQUEST,
      search: {}
    };

    expect(serviceReducer(state, action)).toEqual(inputProps);
  });
});
