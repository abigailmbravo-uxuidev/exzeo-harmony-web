import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicyWorkflowDetails } from './PolicyWorkflowDetails';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicyWorkflowDetails component', () => {
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

  it('should test PolicyWorkflowDetails', () => {
    const initialState = {
      service: {
        getSummaryLedger: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      policy: {
        policyID: 12345,
        policyNumber: 123

      },
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
    const wrapper = shallow(<PolicyWorkflowDetails store={store} {...props} />);
    expect(wrapper);
  });
});
