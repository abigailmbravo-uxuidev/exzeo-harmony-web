import React from 'react';
import { shallow } from 'enzyme';
import PolicyTabs from './PolicyTabs';

describe('PolicyTabs', () => {
  it('renders PolicyTabs coverage', () => {
    const wrapper = shallow(
      <PolicyTabs activeTab="coverage" policyNumber="12345" />
    );
    expect(wrapper);
  });
  it('renders PolicyTabs policyHolder', () => {
    const wrapper = shallow(
      <PolicyTabs activeTab="policyHolder" policyNumber="12345" />
    );
    expect(wrapper);
  });
  it('renders PolicyTabs documents', () => {
    const wrapper = shallow(
      <PolicyTabs activeTab="documents" policyNumber="12345" />
    );
    expect(wrapper);
  });
  it('renders PolicyTabs property', () => {
    const wrapper = shallow(
      <PolicyTabs activeTab="property" policyNumber="12345" />
    );
    expect(wrapper);
  });
});
