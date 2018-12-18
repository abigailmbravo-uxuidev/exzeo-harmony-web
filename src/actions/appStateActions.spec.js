import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as appStateActions from './appStateActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('App State Actions', () => {
  it('should call setAppState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      data: { bb: '123' }
    };

    const stateObj = [{
      type: types.APPSTATE_SET,
      appState: { ...inputProps }
    }];

    store.dispatch(appStateActions.setAppState(inputProps.data));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call setAppStateError', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      error: 'my error'
    };

    const stateObj = [{
      type: types.APPSTATE_ERROR,
      appState: { ...inputProps }
    }];

    store.dispatch(appStateActions.setAppStateError(inputProps.error));
    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call dispatchAppState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      data: { bb: '123' }
    };

    const stateObj = [{
      type: types.APPSTATE_SET,
      appState: { ...inputProps }
    }];
    store.dispatch(appStateActions.setAppStateError(stateObj));
    appStateActions.dispatchAppState(inputProps.data)(store.dispatch);
  });
});
