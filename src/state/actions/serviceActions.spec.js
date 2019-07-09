import configureStore from 'redux-mock-store';
import { http as axios } from '@exzeo/core-ui';
import MockAdapter from 'axios-mock-adapter';
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

  it('should call start getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuote`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '1-234567890-12'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions
      .getQuote('1-234567890-12')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuote`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '1-234567890-12'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions
      .getQuote(324324324)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should handle default error', () => {
    const message = serviceActions.handleError({ response: {} });
    expect(message).toEqual('An error happened');
  });

  it('should call start getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuote`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '599ed8b04efcdc001284f0cb'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions
      .getQuote('599ed8b04efcdc001284f0cb')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuote`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: '599ed8b04efcdc001284f0cb'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions
      .getQuote('1')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start searchPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?searchPolicy`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path:
          '/transactions?companyCode=TTIC&state=FL&policyNumber=12-4001126-01&firstName=Test&lastName=Test&propertyAddress=123&page=1&pageSize=25&sort=policyNumber&sortDirection=desc'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    const params = {
      policyNumber: '12-4001126-01',
      firstName: 'Test',
      lastName: 'Test',
      address: '123',
      page: '1',
      pageSize: 25,
      sort: 'policyNumber',
      direction: 'desc',
      companyCode: 'TTIC',
      state: 'FL'
    };

    return serviceActions
      .searchPolicy(params)(store.dispatch)
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });
});
