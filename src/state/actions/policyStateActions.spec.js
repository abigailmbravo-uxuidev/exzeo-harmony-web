import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as policyStateActions from './policyStateActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('policyStateActions', () => {
  it('should set policyState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [
      {
        type: types.GET_POLICY,
        policyState: {
          policyNumber: '1',
          update: false
        }
      }
    ];

    store.dispatch(policyStateActions.updatePolicy(false, '1'));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should dispatch policyState', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [
      {
        type: types.GET_POLICY,
        policyState: {
          policyNumber: '1',
          update: false
        }
      }
    ];
    store.dispatch(policyStateActions.updatePolicy(false, '1'));
    expect(store.getActions()).toEqual(stateObj);
  });
});
