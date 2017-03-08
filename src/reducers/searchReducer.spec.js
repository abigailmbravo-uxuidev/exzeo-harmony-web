import { Map } from 'immutable';
import reducer from './searchReducer';
import * as types from '../actions/actionTypes';

describe('auth reducer', () => {
  let state;
  beforeEach(() => {
    state = new Map({});
  });

  it('should return the initial state', () => {
    expect(reducer(state, {})).to.deep.equal(state);
  });

  it('should handle SET_SEARCH_CONFIG', () => {
    const config = 'testing';
    const result = reducer(state, {
      type: types.SET_SEARCH_CONFIG,
      config
    });
    expect(result.get('config')).to.deep.equal(config);
  });

  it('should handle CLEAR_SEARCH_CONFIG', () => {
    const configState = state.set('config', 'test');
    const result = reducer(configState, {
      type: types.CLEAR_SEARCH_CONFIG
    });
    expect(result.get('config')).to.be.undefined;
  });
});
