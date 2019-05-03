import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicyWorkflow } from './PolicyWorkflow';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicyWorkflow component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {},
      error: {},
      agencyState: {
        agents: []
      }
    };
    const store = mockStore(initialState);
    const props = {};
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicyWorkflow', () => {
    const initialState = {
      service: {},
      error: {}
    };
    const store = mockStore(initialState);
    const props = {
      initializePolicyWorkflow: x => x,
      error: {},
      match: { params: {} }
    };
    const wrapper = shallow(<PolicyWorkflow store={store} {...props} />);
    expect(wrapper);
  });
});
