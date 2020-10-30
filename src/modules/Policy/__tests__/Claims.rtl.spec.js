import React from 'react';
import { date } from '@exzeo/core-ui';

import {
  render,
  mockServiceRunner,
  waitForElementToBeRemoved,
  within,
  screen,
  defaultPolicyWorkflowProps
} from '../../../test-utils';
import claimsData from '../fixtures/fetchClaimsResponse';
import PolicyWorkflow from '../PolicyWorkflow';

describe('Policy Claims Page', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/claims' },
    match: { params: { step: 'claims', policyNumber: '12-345-67' } }
  };

  const termOrder = {
    claimNumber: 0,
    claimStatus: 1,
    lossType: 2,
    reportedDate: 3,
    lossDate: 4,
    closedDate: 5
  };

  const formatDate = claimDate =>
    date.moment.utc(claimDate).format('MM/DD/YYYY');

  it('Policy Claims: No data', async () => {
    mockServiceRunner([]);
    render(<PolicyWorkflow {...props} />);
    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    expect(
      within(screen.getByRole('form')).getByText(
        'There are no claims to display for this policy.'
      )
    ).toBeInTheDocument();
  });

  it('Policy Claims: Order and data format', async () => {
    mockServiceRunner(claimsData);

    // Sort and filter mock data to match the expected data 'shape'
    // This is only needed because these tests use relative dates; all other assertions are hard-coded
    // 1. Remove SIU/Subro claims (those claims have letters in the last part of the claimNumber)
    // 2. sort claims in descending order of claimNumber (oldest should be on the bottom)
    const sortedFilteredClaims = claimsData
      .filter(c => !c.claimNumber.split('-')[2].match(/[A-Z]/gi))
      .sort((a, b) => (b.claimNumber < a.claimNumber ? -1 : 1));

    render(<PolicyWorkflow {...props} />);

    await waitForElementToBeRemoved(() => screen.getByRole('status'));

    const form = screen.getByRole('form');
    const claimSections = within(form).getAllByRole('list');

    expect(claimSections.length).toBe(3);

    // Check first and last claim data to ensure order and data format are correct
    // highest claimNumber should be listed first
    expect(
      within(claimSections[0]).getByRole('heading').firstElementChild
    ).toHaveClass('claims-icon');
    expect(within(claimSections[0]).getByRole('heading').textContent).toBe(
      'Claim 3'
    );
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.claimNumber]
        .nextSibling.textContent
    ).toBe('3-3-03');
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.claimStatus]
        .nextSibling.textContent
    ).toBe('Closed');
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.lossType]
        .nextSibling.textContent
    ).toBe('WATER - INTERNAL');
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.reportedDate]
        .nextSibling.textContent
    ).toBe(formatDate(sortedFilteredClaims[0].dateReported));
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.lossDate]
        .nextSibling.textContent
    ).toBe(formatDate(sortedFilteredClaims[0].dateOfLoss));
    expect(
      within(claimSections[0]).getAllByRole('term')[termOrder.closedDate]
        .nextSibling.textContent
    ).toBe(formatDate(sortedFilteredClaims[0].dateClosed));

    expect(within(claimSections[2]).getByRole('heading').textContent).toBe(
      'Claim 1'
    );
    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.claimNumber]
        .nextSibling.textContent
    ).toBe('1-1-01');

    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.claimStatus]
        .nextSibling.textContent
    ).toBe('Open');
    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.lossType]
        .nextSibling.textContent
    ).toBe('MISC');

    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.reportedDate]
        .nextSibling.textContent
    ).toBe(formatDate(sortedFilteredClaims[2].dateReported));
    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.lossDate]
        .nextSibling.textContent
    ).toBe(formatDate(sortedFilteredClaims[2].dateOfLoss));
    expect(
      within(claimSections[2]).getAllByRole('term')[termOrder.closedDate]
        .nextSibling.textContent
    ).toBe('N/A');
  });
});
