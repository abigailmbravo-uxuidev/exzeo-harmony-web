import configureStore from 'redux-mock-store';
import nock from 'nock';

import * as types from './actionTypes';
import * as userActions from './userActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('User Actions', () => {
  it('should call authenticating', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      state: 'bb'
    }

    const stateObj = [{
      type: types.AUTHENTICATING,
      state: inputProps.state
    }];

    store.dispatch(userActions.authenticating(inputProps.state));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call authenticated', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      user: 'bb'
    }

    const stateObj = [{
      type: types.AUTHENTICATED,
      user: inputProps.user
    }];

    store.dispatch(userActions.authenticated(inputProps.user));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call authenticateError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      user: 'bb'
    }

    const stateObj = [{
      type: types.AUTHENTICATE_ERROR,
      user: inputProps.user
    }];

    store.dispatch(userActions.authenticateError(inputProps.user));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call login thunk', () => {
    const creds = {
      username: 'bb',
      password: 'pass'
    };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}`,
      data: creds
    };

    nock(axiosOptions.url)
      .post('/auth', axiosOptions.data)
      .reply(200, { token: { id_token: '1234' } });

    const initialState = {};
    const store = mockStore(initialState);


    const user = { token: '1234', isAuthenticated: true, loggedOut: false };

    const stateObj = [{ state: 'athenticating', type: types.AUTHENTICATING }, {
      type: types.AUTHENTICATED,
      user
    }];

    return userActions.login(creds)(store.dispatch)
      .then(() => {
        expect(store.getActions()).toEqual(stateObj);
      });

  });
  it('should call logout', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const user = { token: undefined, isAuthenticated: false, loggedOut: true }

    const stateObj = [{
      type: types.AUTHENTICATED,
      user
    }];

    userActions.logout()(store.dispatch);

    expect(store.getActions()).toEqual(stateObj);
  });
});
