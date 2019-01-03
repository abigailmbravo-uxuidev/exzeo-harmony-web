import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as appStateActions from './appStateActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('App State Actions', () => {
  it('should call toggleLoading', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.TOGGLE_LOADING,
      isLoading: true
    }];

    store.dispatch(appStateActions.toggleLoading(true));

    expect(store.getActions()).toEqual(stateObj);
  });
  it('should call toggleSnackbar', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.TOGGLE_SNACKBAR,
      showSnackBar: true
    }];

    store.dispatch(appStateActions.toggleSnackbar(true));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call setRecalc', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [{
      type: types.SET_RECALC,
      isRecalc: true
    }];

    store.dispatch(appStateActions.setRecalc(true));

    expect(store.getActions()).toEqual(stateObj);
  });
});
