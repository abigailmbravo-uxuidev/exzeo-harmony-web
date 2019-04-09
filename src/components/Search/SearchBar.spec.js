import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { mount } from 'enzyme';

import ConnectedApp, { handleSearchBarSubmit, validate, changePageQuote } from './SearchBar';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing SearchBar component', () => {
  it('should test connected app', () => {
    const initialState = {
      search: {},
      authState: { userProfile: { appMetadata: { beta: true}}},
      service: {
        policyResults: {}
      },
      form: {
        SearchBar: {
          values: {
            searchType: 'address'
          }
        }
      },
      appState: {
        data: {
          searchType: 'address'
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      handleSubmit: x => x,
      userProfile: {
        appMetadata: { beta: true},
        groups: [{ state: 'FL', companyCode: 'TTIC' }]
      },
      actions: {
        searchActions: {
          searchQuotes() {},
          setQuoteSearch() {}
        }
      },
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false,
          searchType: 'address'
        }
      }
    };
    const wrapper = mount(
    <Provider store={store}>
      <ConnectedApp store={store} {...props} />
    </Provider>);
    expect(wrapper);
  });
  it('should test handleFormSubmit', () => {
    const initialState = {
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);

    const props = {
      userProfile: {
        appMetadata: { beta: true},
        groups: [{ state: 'FL', companyCode: 'TTIC' }]
      },
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      clearAppError() {},
      searchQuotes() {},
      setQuoteSearch() {},
      searchAddresses() {},
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [{
          id: '049a50b23c21c2ae3',
          type: 'Mortgagee',
          order: 1,
          name1: 'BB&T Home Mortgage',
          referenceNumber: '1234567',
          mailingAddress: {
            address1: '5115 Garden Vale Ave',
            city: 'Tampa',
            state: 'FL',
            county: 'Hillsborough',
            zip: '33624',
            country: {
              code: 'USA',
              displayText: 'United States of America'
            }
          },
          active: true
        }]
      },
      ...propTypes
    };

    handleSearchBarSubmit({
      firstName: '',
      lastName: '',
      address: '',
      quoteNumber: '',
      policyNumber: '',
      zip: ''
    }, store.dispatch, props);
  });

  it('should test validate', () => {
    const values = {
      zip: '*^%$',
      firstName: '*^%$',
      lastName: '$#%$#%',
      policyNumber: '%^%$^$%',
      quoteNumber: '%^$%^$%^',
      address: '/'
    };
    const errors = validate(values);
    expect(errors.firstName).toEqual('Invalid characters');
    expect(errors.lastName).toEqual('Invalid characters');
    expect(errors.quoteNumber).toEqual('Only numbers and dashes allowed');
    expect(errors.zip).toEqual('Invalid characters');
    expect(errors.address).toEqual('Invalid characters');
  });

  it('should paging functions', () => {
    const initialState = {
      appState: {
        data: {
          showAdditionalInterestModal: false
        },
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);

    const props = {
      clearAppError() {},
      searchQuotes() {},
      setQuoteSearch() {},
      searchAddresses() {},
      userProfile: {
        groups: [{ state: 'FL', companyCode: 'TTIC' }]
      },
      fieldValues: {
        searchType: 'address'
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      quoteData: {
        AdditionalInterests: [{
          id: '049a50b23c21c2ae3',
          type: 'Mortgagee',
          order: 1,
          name1: 'BB&T Home Mortgage',
          referenceNumber: '1234567',
          mailingAddress: {
            address1: '5115 Garden Vale Ave',
            city: 'Tampa',
            state: 'FL',
            county: 'Hillsborough',
            zip: '33624',
            country: {
              code: 'USA',
              displayText: 'United States of America'
            }
          },
          active: true
        }]
      },
      ...propTypes
    };
    changePageQuote(props, false);
    changePageQuote(props, true);
  });
});
