import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  latestPolicy
} from '../../../test-utils';
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

  it('Has a detail header, tab navs, and footer', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedPolicyWorkflow {...props} />, { state })
    expect(getByTestId('policyHolderDetail'));
    expect(document.querySelector(`a[href="${props.match.url}/policyHolder"]`)).toBeInTheDocument();
    expect(getByText('©2019 TypTap Management Company. All rights reserved.'));
  });
})