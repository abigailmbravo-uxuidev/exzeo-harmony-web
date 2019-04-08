import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { validate, changePagePolicy, handlePolicySearchSubmit } from './PolicySearchBar';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicySearchBar component', () => {
  it('should test connected app', () => {
    const initialState = {
      search: {},
      service: {
        policyResults: {}
      },
      authState: {
        userProfile: { groups: [{}], entity: {} }
      },
      form: {
        PolicySearchBar: {
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
      userProfile: { entity: {}},
      actions: {},
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
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test validate', () => {
    const values = {
      zip: '*^%$',
      firstName: '*^%$',
      lastName: '$#%$#%',
      policyNumber: '%^%$^$%',
      address: '/'
    };
    const errors = validate(values);
    expect(errors.firstName).toEqual('Invalid characters');
    expect(errors.lastName).toEqual('Invalid characters');
    expect(errors.address).toEqual('Invalid characters');
  });

  it('should paging functions', () => {
    const props = {
      userProfile: { groups: [{}], entity: {} },
      fieldValues: {},
      actions: { searchActions: { setPolicySearch() {} },
        serviceActions: { searchPolicy() { return Promise.resolve(); } }
      }
    };
    changePagePolicy(props, false);
    changePagePolicy(props, true);
    handlePolicySearchSubmit({
      firstName: '',
      lastName: '',
      address: '',
      policyNumber: '',
      searchType: 'policy',
      isLoading: true,
      hasSearched: true,
      page: 1 }, props.dispatch, props);
  });
});
