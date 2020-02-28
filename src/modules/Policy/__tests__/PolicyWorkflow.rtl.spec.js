import React from 'react';

import { render, defaultPolicyWorkflowProps } from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

describe('Policy Workflow testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    policy: { ...defaultPolicyWorkflowProps.policy, policyNumber: '12' },
    location: { pathname: '/policy/12/policyHolder' },
    match: { params: { policyNumber: '12' }, url: '/policy/12' },
    auth: { logout: x => x },
    initializePolicyWorkflow: x => x
  };

  const workflowSections = [
    { text: 'Policyholder', icon: 'fa fa-vcard', status: 'active' },
    { text: 'Property', icon: 'fa fa-map-marker' },
    { text: 'Coverage', icon: 'fa fa-sliders' },
    { text: 'Billing', icon: 'fa fa-money' },
    { text: 'Documents', icon: 'fa fa-file-text-o' }
  ];

  it('POS:Has a detail header, tab navs, and footer', () => {
    const { getByText } = render(<PolicyWorkflow {...props} />);

    expect(
      document.querySelector(`a[href="${props.match.url}/policyHolder"]`)
    ).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="${props.match.url}/property"]`)
    ).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="${props.match.url}/coverage"]`)
    ).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="${props.match.url}/billing"]`)
    ).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="${props.match.url}/documents"]`)
    ).toBeInTheDocument();
    expect(
      getByText(
        `©${new Date().getFullYear()} TypTap Management Company. All rights reserved.`
      )
    );
  });

  it('POS:Checks Policy Workflow Sections', () => {
    const { getAllByText } = render(
      <PolicyWorkflow {...props} />
      // { state }
    );

    workflowSections.forEach(({ text, icon, status = '' }) => {
      // This text can be repeated so we have to confirm we're grabbing the last use of it on the page.
      const label = getAllByText(text).pop();
      expect(label.previousSibling.className).toEqual(icon);
      expect(label.parentNode.className).toContain(status);
    });
  });
});
