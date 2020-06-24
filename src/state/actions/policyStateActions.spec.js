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
        type: types.SET_POLICY,
        policy: { policyNumber: '1' },
        summaryLedger: {}
      }
    ];

    store.dispatch(
      policyStateActions.setAllPolicyDocuments({
        policy: { policyNumber: '1' },
        summaryLedger: {}
      })
    );

    expect(store.getActions()).toEqual(stateObj);
  });
});
