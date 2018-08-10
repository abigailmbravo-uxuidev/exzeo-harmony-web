import React from 'react';
import { shallow } from 'enzyme';
import PropertyComponent from './Property';
import POLICY_TEST_DATA from './policyTestData';

describe('Property', () => {
  const agents = [{ _id: '5af96ae45cc74408e4fbd946', agentCode: 60000, createdAt: '2016-02-03T14:44:06.183Z', createdBy: 'LOAD', emailAddress: 'test@typtap.com', faxNumber: null, firstName: 'WALLY', lastName: 'WAGONER', mailingAddress: { address1: '3001 S.E. MARICAMP ROAD', address2: null, city: 'OCALA', state: 'FL', zip: '34471' }, primaryPhoneNumber: '3525099008', secondaryPhoneNumber: null, status: 'Active', updatedAt: '2016-02-26T16:24:08.137Z', updatedBy: 'LOAD', companyCode: 'TTIC', agencyCode: 20000, state: 'FL', licenseNumber: 'W180087', agentOfRecord: true, appointed: true }];
  it('renders Property with policy', () => {
    const wrapper = shallow(<PropertyComponent activeTab="Property" policyNumber="12345" policy={POLICY_TEST_DATA} agents={agents} />);
    expect(wrapper.exists()).toBe(true);
  });
});
