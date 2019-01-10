import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './serviceActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  it('should call serviceRequest', () => {
    const initialState = {};
    const store = mockStore(initialState);


    const stateObj = [{
      type: types.SERVICE_REQUEST,
      undefined
    }];

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
      url: `${process.env.REACT_APP_API_URL}/svc`,
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

    return serviceActions.getQuote('1-234567890-12')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
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

    return serviceActions.getQuote(324324324)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
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
      url: `${process.env.REACT_APP_API_URL}/svc`,
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

    return serviceActions.getQuote('599ed8b04efcdc001284f0cb')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getQuote', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
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

    return serviceActions.getQuote('1')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call start searchPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: '/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=12-4001126-01&firstName=Test&lastName=Test&propertyAddress=123&page=1&pageSize=25&sort=policyNumber&sortDirection=desc'
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

    return serviceActions.searchPolicy(params)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail searchPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: '/transactions?companyCode=TTIC&state=FL&product=HO3&policyNumber=12-4001126-01&firstName=Test&lastName=Test&propertyAddress=123&active=true&page=1&pageSize=25&sort=policyNumber&sortDirection=asc'
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
    return serviceActions.searchPolicy(params)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call getLatestPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: 'transactions/12-4001126-01/latest'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getLatestPolicy('12-4001126-01')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getLatestPolicy', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'policy-data',
        method: 'GET',
        path: 'transactions/12-4001126-01/latest'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getLatestPolicy('3432424324')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call getSummaryLedger', () => {
    const mockAdapter = new MockAdapter(axios);

    const fetchBilling = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing',
        method: 'GET',
        path: 'summary-ledgers/test01/latest'
      }
    };

    const fetchPayments = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing',
        method: 'GET',
        path: 'payment-history/test01'
      }
    };

    mockAdapter
      .onPost(fetchBilling.url).reply(200, { result: {} })
      .onPost(fetchPayments.url).reply(200, { data: [] });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getSummaryLedger('test01')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].data.getSummaryLedger).toEqual({ payments: [] });
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getSummaryLedger', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'billing',
        method: 'GET',
        path: 'summary-ledgers/12-4001126-01/latest'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getSummaryLedger('3432424324')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });

  it('should call getPolicyDocuments', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'file-index',
        method: 'GET',
        path: 'v1/fileindex/12-4001126-01'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getPolicyDocuments('12-4001126-01')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });

  it('should fail getPolicyDocuments', () => {
    const mockAdapter = new MockAdapter(axios);

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'file-index',
        method: 'GET',
        path: 'v1/fileindex/12-4001126-01'
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: []
    });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getPolicyDocuments('3432424324')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });
});
