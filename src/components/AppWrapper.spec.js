import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppWrapper from './AppWrapper';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AppWrapper component', () => {
  const store = mockStore({
    error: {},
    agencyState: {
      agency: {}
    },
    authState: {
      userProfile: {}
    }
  });

  const props = {
    logout() {},
    match: {
      params: {}
    },
    children: <div />
  }

  it('should test props and render', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <AppWrapper {...props} />
          </Router>
        </Provider>);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('.content-wrapper')).toHaveLength(1);
    expect(wrapper.find('.site-nav')).toHaveLength(1);
  });
});
