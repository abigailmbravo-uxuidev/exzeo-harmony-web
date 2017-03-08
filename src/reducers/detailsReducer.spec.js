import { Map } from 'immutable';
import reducer from './detailsReducer';
import * as types from '../actions/actionTypes';

describe('details reducer', () => {
  let state;
  beforeEach(() => {
    state = new Map({});
  });

  it('should return the initial state', () => {
    expect(reducer(state, {})).to.deep.equal(state);
  });

  it('should handle SET_DETAILS', () => {
    const details = 'wew';
    const result = reducer(state, {
      type: types.SET_DETAILS,
      details
    });
    expect(result.get('details')).to.deep.equal(details);
  });

  it('should handle GET_DETAILS', () => {
    const result = reducer(state, {
      type: types.GET_DETAILS
    });
    expect(result).to.deep.equal(state);
  });
});
