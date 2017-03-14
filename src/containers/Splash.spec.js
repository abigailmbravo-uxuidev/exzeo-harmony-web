import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import Splash from './Splash';

let wrapper;
const mockStore = configureStore([]);
const store = mockStore({
  features: { get() { } }
});

describe('Splash', () => {
  beforeEach(() => {
    wrapper = shallow(<Splash store={store} />);
  });

  it('should render', () => {
    expect(wrapper).to.exist;
  });
});
