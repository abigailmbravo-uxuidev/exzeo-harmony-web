import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicyDocuments } from './PolicyDocuments';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicyDocuments component', () => {
  it('should test connected app', () => {
    const initialState = {
      service: {
        getSummaryLedger: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getSummaryLedger() {},
          getLatestPolicy() {}

        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicyDocuments', () => {
    const initialState = {
      service: {
        getSummaryLedger: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      location: {
        state: {
          policyNumber: 123
        }
      },
      policy: {
        policyID: 12345,
        policyNumber: 123

      },
      actions: {
        policyStateActions: {
          updatePolicy() {}
        },
        serviceActions: {
          getPolicyDocuments() {},
          getSummaryLedger() {},
          getLatestPolicy() {}

        }
      }
    };
    const wrapper = shallow(<PolicyDocuments store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
  });
});
