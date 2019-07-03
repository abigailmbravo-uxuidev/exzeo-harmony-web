import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { QuoteSearch } from './Quote';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing QuoteSearch component', () => {
  it('should test connected app', () => {
    const initialState = {
      appState: {
        isLoading: false
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        logout: x => x
      },
      match: {}
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicySearch', () => {
    const props = {
      auth: {
        logout: x => x
      },
      match: {},
      isLoading: false
    };
    const wrapper = shallow(<QuoteSearch {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
