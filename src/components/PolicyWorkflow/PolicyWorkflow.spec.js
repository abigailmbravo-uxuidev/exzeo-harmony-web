import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicyWorkflow } from './PolicyWorkflow';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicyWorkflow component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {}
    };
    const store = mockStore(initialState);
    const props = {};
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicyWorkflow', () => {
    const initialState = {
      service: {}
    };
    const store = mockStore(initialState);
    const props = {
      getPolicyDocumentsAction() {},
      getSummaryLedgerAction() {},
      getLatestPolicyAction() { return Promise.resolve({}); },
      getAgentsByAgencyAction() {},
      match: {
        params: {}
      }
    };
    const wrapper = shallow(<PolicyWorkflow store={store} {...props} />);
    expect(wrapper);
  });
});
