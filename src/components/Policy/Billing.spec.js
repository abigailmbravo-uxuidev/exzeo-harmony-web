import React from 'react';
import { shallow } from 'enzyme';
import Billing from './Billing';
import POLICY_TEST_DATA from './policyTestData';
import BILLING_TEST_DATA from './billingTestData.json';

describe('Billing', () => {
  it('Should render Billing', () => {
    const wrapper = shallow(<Billing activeTab="billing" policyNumber="12345" billing={BILLING_TEST_DATA} policy={POLICY_TEST_DATA} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have sections', () => {
    const wrapper = shallow(<Billing activeTab="billing" policyNumber="12345" billing={BILLING_TEST_DATA} policy={POLICY_TEST_DATA} />);
    expect(wrapper.find('section')).toHaveLength(3);
  });
});
