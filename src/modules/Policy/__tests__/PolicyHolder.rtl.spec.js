import React from 'react';

import {
  renderWithReduxAndRouter,
  defaultPolicyWorkflowProps,
  agent,
  checkHeader
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

const pageHeaders = [
  {
    text: 'Policyholder 1',
    icon: 'fa fa-vcard-o'
  },
  {
    text: 'Policyholder 2',
    icon: 'fa fa-vcard-o'
  },
  {
    text: 'Agent',
    icon: 'fa fa-vcard-o'
  }
];

describe('Policy Policyholder Page testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/policyHolder' },
    agents: [agent]
  };

  const twoPhProps = {
    ...props,
    policy: {
      ...props.policy,
      policyHolders: [
        ...props.policy.policyHolders,
        {
          _id: '2',
          entityType: 'Person',
          firstName: 'Green',
          lastName: 'Goblin',
          primaryPhoneNumber: '9753142864',
          secondaryPhoneNumber: null,
          emailAddress: 'Normanosborne@hotmail.com'
        }
      ]
    }
  };

  it('Does not show 2nd ph when only one is present', () => {
    const { queryByText } = renderWithReduxAndRouter(
      <PolicyWorkflow {...props} />
    );

    expect(queryByText('Policyholder 2')).not.toBeInTheDocument();
  });

  it('POS:Checks all headers', () => {
    const { getByText } = renderWithReduxAndRouter(
      <PolicyWorkflow {...twoPhProps} />
    );

    pageHeaders.forEach(header => checkHeader(getByText, header));
  });

  it('POS:Policyholder 1 and Agent Details', () => {
    const { getByText, getAllByText } = renderWithReduxAndRouter(
      <PolicyWorkflow {...twoPhProps} />
    );

    expect(getByText('Policyholder Name').nextSibling).toHaveTextContent(
      'BATMAN ROBIN'
    );
    expect(getAllByText('Phone 1')[0].nextSibling).toHaveTextContent(
      '(727) 123-1234'
    );
    expect(getAllByText('Phone 2')[0].nextSibling).toHaveTextContent(
      '(987) 123-4567'
    );
    expect(getAllByText('Email')[0].nextSibling).toHaveTextContent(
      'MSARMIENTO@HCPCI.COM'
    );
    expect(getAllByText('Mailing Address')[0].nextSibling).toHaveTextContent(
      '4131 TEST ADDRESS'
    );
    expect(getByText('SARASOTA, FL 00001'));

    expect(getAllByText('Policyholder Name')[1].nextSibling).toHaveTextContent(
      'Green Goblin'
    );
    expect(getAllByText('Phone 1')[1].nextSibling).toHaveTextContent(
      '(975) 314-2864'
    );
    expect(getAllByText('Email')[1].nextSibling).toHaveTextContent(
      'Normanosborne@hotmail.com'
    );

    expect(getByText('Agent Name').nextSibling).toHaveTextContent(
      'WALLY WAGONER'
    );
    expect(getByText('Phone').nextSibling).toHaveTextContent('(352) 509-9008');
    expect(getAllByText('Email')[2].nextSibling).toHaveTextContent(
      'test@typtap.com'
    );
    expect(getAllByText('Mailing Address')[1].nextSibling).toHaveTextContent(
      '3001 S.E. MARICAMP ROAD'
    );
    expect(getByText('OCALA, FL 34471'));
  });
});
