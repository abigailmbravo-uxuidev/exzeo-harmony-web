import React from 'react';
import _cloneDeep from 'lodash/cloneDeep';

import {
  render,
  within,
  defaultPolicyWorkflowProps,
  checkHeader
} from '../../../test-utils';
import PolicyWorkflow from '../PolicyWorkflow';

const pageHeaders = [
  {
    text: 'Coverage Limits',
    icon: 'fa fa-line-chart'
  },
  {
    text: 'Discount / Surcharge',
    icon: 'fa fa-shopping-cart'
  },
  {
    text: 'Deductible',
    icon: 'fa fa-long-arrow-down'
  }
];

describe('Policy Coverage Page testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/coverage' },
    match: { params: { step: 'coverage', policyNumber: '12-345-67' } }
  };

  it('POS:Checks headers', () => {
    const { getByText } = render(<PolicyWorkflow {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header.text, header));
  });

  it('POS:Coverage Limits Details', () => {
    const { getByTestId } = render(<PolicyWorkflow {...props} />);
    const sectionData = [
      { label: 'A. Dwelling', value: '$314,000' },
      { label: 'B. Other Structures', value: '$6,280' },
      { label: 'C. Personal Property', value: '$78,500' },
      { label: 'D. Loss of Use', value: '$31,400' },
      { label: 'E. Personal Liability', value: '$300,000' },
      { label: 'F. Medical Payments', value: '$2,000' },
      { label: 'Personal Property Replacement Cost', value: 'Yes' },
      { label: 'Mold Property', value: '$10,000' },
      { label: 'Mold Liability', value: '$50,000' },
      { label: 'Ordinance or Law', value: '25%' },
      { label: 'All Other Perils Deductible', value: '$1,000' },
      { label: 'Hurricane Deductible', value: '$6,280' },
      { label: 'Sinkhole Deductible', value: '$31,400' }
    ];

    const section = getByTestId('coverage-limits');
    sectionData.forEach(({ label, value }) =>
      expect(within(section).getByText(label).nextSibling.textContent).toEqual(
        value
      )
    );
  });

  it('POS:Discount / Surcharge Details', () => {
    const { getByTestId } = render(<PolicyWorkflow {...props} />);
    const sectionData = [
      { label: 'Townhouse/Rowhouse', value: 'No' },
      { label: 'Property Ever Rented', value: 'Never' },
      { label: 'Seasonally Occupied', value: 'No' },
      { label: 'No Prior Insurance', value: 'No' },
      { label: 'Burglar Alarm', value: 'No' },
      { label: 'Fire Alarm', value: 'No' },
      { label: 'Sprinkler', value: 'No' },
      { label: 'Wind Mit Factor', value: '0' }
    ];

    const section = getByTestId('discount-surcharge');
    sectionData.forEach(({ label, value }) =>
      expect(within(section).getByText(label).nextSibling.textContent).toEqual(
        value
      )
    );
  });

  it('POS:Deductible Details with sinkhole value', () => {
    const { getByTestId } = render(<PolicyWorkflow {...props} />);
    const sectionData = [
      { label: 'All Other Perils', value: '$1,000' },
      { label: 'Hurricane Deductible', value: '2%' },
      { label: 'Sinkhole Deductible', value: '10%' }
    ];

    const section = getByTestId('deductible');
    sectionData.forEach(({ label, value }) =>
      // Since these labels can we repeat we have to confirm we're getting the last one on the page
      expect(within(section).getByText(label).nextSibling.textContent).toEqual(
        value
      )
    );
  });

  it('POS:Deductible Details without sinkhole', () => {
    const policyClone = _cloneDeep(defaultPolicyWorkflowProps.policy);
    const policyProps = {
      ...props,
      policy: policyClone
    };

    delete policyProps.policy.deductibles.sinkhole;

    const { getByTestId } = render(<PolicyWorkflow {...policyProps} />);
    const sectionData = [
      { label: 'All Other Perils', value: '$1,000' },
      { label: 'Hurricane Deductible', value: '2%' },
      { label: 'Sinkhole Deductible', value: 'No' }
    ];
    const section = getByTestId('deductible');
    sectionData.forEach(({ label, value }) =>
      // Since these labels can we repeat we have to confirm we're getting the last one on the page
      expect(within(section).getByText(label).nextSibling.textContent).toEqual(
        value
      )
    );
  });
});
