import * as actions from './authActions';
import * as types from './actionTypes';

describe('authActions', () => {
  it('should create an action of authenticating', () => {
    const state = 'Winning';
    const expectedAction = {
      type: types.AUTHENTICATING,
      state
    };

    expect(actions.authenticating(state)).to.deep.equal(expectedAction);
  });

  it('should create an action of authenticated', () => {
    const token = '214';
    const expectedAction = {
      type: types.AUTHENTICATED,
      token
    };

    expect(actions.authenticated(token)).to.deep.equal(expectedAction);
  });

  it('should create an action of toggle feature on authencated error', () => {
    const error = 'testing error';
    const expectedAction = {
      type: types.TOGGLE_FEATURE,
      error
    };

    expect(actions.authenticateError(error)).to.deep.equal(expectedAction);
  });

  it('should create an auction of auth me', () => {
    const me = 'Zeke';
    const expectedAction = {
      type: types.AUTH_ME,
      me
    };

    expect(actions.authenticatedMe(me)).to.deep.equal(expectedAction);
  });
});
