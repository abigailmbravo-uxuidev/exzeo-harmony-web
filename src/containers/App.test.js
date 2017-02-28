import React from 'react';
import { mount } from 'enzyme';
import { App } from './App';

const props = {
  auth: {
    get: () => {}
  },
  features: {
    get: () => {}
  }
};

const actions = {
  initializeLD: () => {}
};

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    window.appConfig = {};
    window.appConfig.appTitle = 'Waffles';
    wrapper = mount(
      <App actions={actions} loggedIn={false} features={props.features} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should display the splash component when not logged in', () => {
    const result = wrapper.children().nodes[0].props.component.displayName;
    expect(result).to.contain('Splash');
  });

  it('should display the home component when logged in', () => {
    wrapper.setProps({ loggedIn: true });
    const result = wrapper.children().nodes[0].props.component.displayName;
    expect(result).to.contain('Home');
  });
});
