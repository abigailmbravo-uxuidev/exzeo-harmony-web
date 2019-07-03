import React from 'react';
import { render } from 'react-testing-library';

import { checkHeader, latestPolicy, agent } from '../../../test-utils';
import PolicyHolder from '../PolicyHolder';

const pageHeaders = [
  {
    text: 'Policyholder 1',
    icon: 'fa fa-vcard-o'
  },
  {
    text: 'Agent',
    icon: 'fa fa-vcard-o'
  }
];

describe('Policy Policyholder Page testing', () => {
  const props = {
    policy: latestPolicy,
    agents: [agent]
  };

  it('POS:Checks all headers with 1 ph', () => {
    const { getByText, queryByText } = render(<PolicyHolder {...props} />);

    pageHeaders.forEach(header => checkHeader(getByText, header));
    expect(queryByText('Policyholder 2')).not.toBeInTheDocument();
  });

  it('POS:Policyholder 1 and Agent Details', () => {
    const { getByText, getAllByText } = render(<PolicyHolder {...props} />);

    expect(getByText('Policyholder Name').nextSibling).toHaveTextContent(
      'BATMAN ROBIN'
    );
    expect(getAllByText('Phone')[0].nextSibling).toHaveTextContent(
      '(727) 123-1234'
    );
    expect(getAllByText('Email')[0].nextSibling).toHaveTextContent(
      'MSARMIENTO@HCPCI.COM'
    );
    expect(getAllByText('Mailing Address')[0].nextSibling).toHaveTextContent(
      '4131 TEST ADDRESS SARASOTA, FL 00001'
    );

    expect(getByText('Agent Name').nextSibling).toHaveTextContent(
      'WALLY WAGONER'
    );
    expect(getAllByText('Phone')[1].nextSibling).toHaveTextContent(
      '(352) 509-9008'
    );
    expect(getAllByText('Email')[1].nextSibling).toHaveTextContent(
      'test@typtap.com'
    );
    expect(getAllByText('Mailing Address')[1].nextSibling).toHaveTextContent(
      '3001 S.E. MARICAMP ROAD OCALA, FL 34471'
    );
  });

  it('POS:Renders second policyholder info', () => {
    const newProps = {
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
            emailAddress: 'Normanosborne@hotmail.com'
          }
        ]
      }
    };

    const { getByText, getAllByText } = render(<PolicyHolder {...newProps} />);
    checkHeader(getByText, { text: 'Policyholder 2', icon: 'fa fa-vcard-o' });

    expect(getAllByText('Policyholder Name')[1].nextSibling).toHaveTextContent(
      'Green Goblin'
    );
    expect(getAllByText('Phone')[1].nextSibling).toHaveTextContent(
      '(975) 314-2864'
    );
    expect(getAllByText('Email')[1].nextSibling).toHaveTextContent(
      'Normanosborne@hotmail.com'
    );
  });
});
