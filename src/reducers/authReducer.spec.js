import { Map } from 'immutable';
import reducer from './authReducer';
import * as types from '../actions/actionTypes';

describe('auth reducer', () => {
  let state;
  beforeEach(() => {
    state = new Map({});
  });

  it('should return the initial state', () => {
    expect(reducer(state, {})).to.deep.equal(state);
  });

  it('should handle AUTHENTICATED', () => {
    const token = '214';
    const result = reducer(state, {
      type: types.AUTHENTICATED,
      token
    });
    expect(result.get('token')).to.deep.equal(token);
  });

  it('should handle AUTH_ME', () => {
    const me = 'zeke';
    const result = reducer(state, {
      type: types.AUTH_ME,
      me
    });
    expect(result.get('me')).to.deep.equal(me);
  });
});
