import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicyDocuments } from './Documents';

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
      policyDocuments: [{
        fileUrl: 'http://cfs/v1/5b619675b63d290021a9c751/AppPacket-12-5019632-01-20180801-071705-igDSfakl4.pdf',
        version: '',
        envelopeId: '39679404-6f5a-4bf8-9c49-55e4f6559c2c',
        fileName: 'AppPacket-12-5019632-01-20180801-071705-igDSfakl4.pdf',
        createdDate: 1533122321,
        createdBy: 'auth0|SYSTEMUSER|0',
        policyNumber: '12-1009404-01'
      }],
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
  });
});
