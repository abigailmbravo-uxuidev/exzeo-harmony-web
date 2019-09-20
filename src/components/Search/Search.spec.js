import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Search } from './Search';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Search component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      retrieveQuote: jest.fn(),
      createQuote: jest.fn(),
      history: { replace: jest.fn() },
      clearResults() {},
      clearQuote() {},
      handleSubmit() {},
      fieldQuestions: [],
      quote: {},
      dispatch: store.dispatch,
      userProfile: { entity: {} },
      appState: {
        data: {
          submitting: false
        }
      },
      agency: {
        status: 'Active'
      },
      search: {}
    };
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper);
    const address = {
      physicalAddress: {
        address1: '1000 Poplar Ave',
        address2: null,
        city: 'Tampa',
        state: 'FL',
        county: 'Hillsborough',
        zip: '33607',
        latitude: 28.0959571,
        longitude: -82.5380074
      }
    };

    wrapper.instance().handleSelectAddress(address);
    wrapper.instance().handleSelectQuote(props.quote);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {
        quote: {}
      },
      authState: {
        userProfile: {}
      },
      appState: {
        modelName: 'bb'
      },
      agencyState: {
        agency: { status: 'Active' }
      }
    };
    const store = mockStore(initialState);
    const props = {
      quote: {
        quoteState: 'Quote Started'
      },
      userProfile: {},
      fieldQuestions: [],
      dispatch: store.dispatch,
      createQuote: jest.fn(),
      handleSubmit() {},
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      agency: {
        status: 'Active'
      },
      search: {},
      history: { replace: jest.fn() }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
