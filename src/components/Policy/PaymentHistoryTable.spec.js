import React from 'react';
import { shallow } from 'enzyme';
import PaymentHistoryTable from './PaymentHistoryTable';

const payments = [{
    "createdBy": {
      "userId": "test",
      "userName": "tticcsr",
    },
    "updatedBy": {
      "userId": "test",
      "userName": "tticcsr",
    },
    "companyCode": "TTIC",
    "state": "FL",
    "product": "HO3",
    "policyNumber": "test-01",
    "policyTerm": 1,
    "policyAccountCode": 10000,
    "date": "2018-10-09T00:00:00.000Z",
    "type": "Electronic Deposit",
    "description": "Payment Received",
    "batch": "test-01",
    "amount": {
      "$numberDecimal": "200.00"
    },
    "__v": 0,
    "updatedAt": "2018-10-09T17:36:37.740Z",
    "createdAt": "2018-10-09T17:36:37.740Z"
  }]

describe('Test the PaymentHistoryTable Component', () => {
  it('Should Render PaymentHistoryTable', () => {
    const wrapper = shallow(<PaymentHistoryTable paymentHistory={payments} />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should Have Bootstrap Table elements', () => {
    const wrapper = shallow(<PaymentHistoryTable paymentHistory={payments} />);
    expect(wrapper.find('BootstrapTable')).toHaveLength(1);
    expect(wrapper.find('TableHeaderColumn')).toHaveLength(4);
  });
});