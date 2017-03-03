import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import Login from './Login';

let wrapper;
const mockStore = configureStore([]);
const store = mockStore({
  features: { get() { } }
});

describe('Login', () => {
  beforeEach(() => {
    wrapper = shallow(<Login store={store} />);
  });

  it('should render', () => {
    expect(wrapper).to.exist;
  });
});
