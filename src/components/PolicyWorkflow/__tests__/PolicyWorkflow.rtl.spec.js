import React from 'react';

import { renderWithReduxAndRouter, latestPolicy } from '../../../test-utils';
import ConnectedPolicyWorkflow from '../PolicyWorkflow';

describe('Policy Workflow testing', () => {
  const props = {
    location: { pathname: '/policy/12/coverage' },
    match: { params: { policyNumber: '12' }, url: '/policy/12' }
  };

  const state = {
    error: {},
    agencyState: { agents: [] },
    service: {
      latestPolicy
    }
  };

  const workflowSections = [
    { text: 'Policyholder', icon: 'fa fa-vcard' },
    { text: 'Property', icon: 'fa fa-map-marker' },
    { text: 'Coverage', icon: 'fa fa-sliders', status: 'active' },
    { text: 'Billing', icon: 'fa fa-money' },
    { text: 'Documents', icon: 'fa fa-file-text-o' }
  ];

  it('POS:Has a detail header, tab navs, and footer', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(
      <ConnectedPolicyWorkflow {...props} />,
      { state }
    );
    expect(getByTestId('policyHolderDetail'));
    expect(
      document.querySelector(`a[href="${props.match.url}/policyHolder"]`)
    ).toBeInTheDocument();
    expect(getByText('©2019 TypTap Management Company. All rights reserved.'));
  });

  it('POS:Checks Policy Workflow Sections', () => {
    const { getAllByText } = renderWithReduxAndRouter(
      <ConnectedPolicyWorkflow {...props} />,
      { state }
    );

    workflowSections.forEach(({ text, icon, status = '' }) => {
      // This text can be repeated so we have to confirm we're grabbing the last use of it on the page.
      const label = getAllByText(text).pop();
      expect(label.previousSibling.className).toEqual(icon);
      status.length && expect(label.parentNode.className).toContain(status);
    });
  });
});
