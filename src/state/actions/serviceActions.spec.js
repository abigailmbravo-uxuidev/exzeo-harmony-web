import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  it('should call serviceRequest', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const stateObj = [
      {
        type: types.SERVICE_REQUEST,
        undefined
      }
    ];

    store.dispatch(serviceActions.serviceRequest());
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should handle default error', () => {
    const message = serviceActions.handleError({ response: {} });
    expect(message).toEqual('An error happened');
  });
});
