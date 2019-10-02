import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppWrapper from '../AppWrapper';

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
    auth: {
      logout() {}
    },
    match: {
      params: {}
    },
    children: <div />
  };

  window.persistor = { purge() {} };

  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <AppWrapper {...props} />
      </Router>
    </Provider>
  );

  it('should test props and render', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div[role="main"]')).toHaveLength(1);
    expect(wrapper.find('.content-wrapper')).toHaveLength(1);
    expect(wrapper.find('.site-nav')).toHaveLength(1);
  });

  it('should test click events', () => {
    wrapper.find(`Button[data-test="sidenav-logout"]`).simulate('click');
    const header = wrapper.find(`Header`);
    header.find('button').simulate('click');
  });
});
