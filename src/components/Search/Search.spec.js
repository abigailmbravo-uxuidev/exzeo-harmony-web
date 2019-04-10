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
      getQuote() {},
      createQuote() {},
      clearResults() {},
      clearQuote() {},
      handleSubmit() {},
      fieldQuestions: [],
      quote: {},
      dispatch: store.dispatch,
      authState: {
        userProfile: {}
      },
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper);
    const address = {
      physicalAddress:
      {
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
      }
    };
    const store = mockStore(initialState);
    const props = {
      quote: {
        quoteState: 'Quote Started'
      },
      authState: {
        userProfile: {}
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      handleSubmit() {},
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
