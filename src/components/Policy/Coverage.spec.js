import React from 'react';
import { shallow } from 'enzyme';
import CoverageComponent from './Coverage';
import POLICY_TEST_DATA from './policyTestData';

describe('Coverage', () => {
  it('renders Coverage without policy', () => {
    const wrapper = shallow(<CoverageComponent activeTab="coverage" policyNumber="12345" policy={null} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders Coverage without policyID', () => {
    const wrapper = shallow(<CoverageComponent activeTab="coverage" policyNumber="12345" policy={{}} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Coverage with policy', () => {
    const wrapper = shallow(<CoverageComponent activeTab="coverage" policyNumber="12345" policy={POLICY_TEST_DATA} />);
    expect(wrapper.exists()).toBe(true);
  });
});
