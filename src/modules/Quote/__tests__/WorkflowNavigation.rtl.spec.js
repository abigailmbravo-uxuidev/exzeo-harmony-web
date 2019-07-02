import React from 'react';

import {
  renderWithReduxAndRouter,
  defaultProps,
  quote
} from '../../../test-utils';
import WorkflowNavigation from '../WorkflowNavigation';

describe('Testing WorkflowNavigation Component', () => {
  const props = {
    ...defaultProps,
    quote,
    header: {
      hideDetailSummary: true,
      fields: [
        { value: 'quoteNumber' }, { value: 'propertyAddress', component: 'Section', label: 'Address' },
        { value: 'yearBuilt' }, { value: 'constructionType' },
        {
          value: 'coverageLimits.dwelling.amount',
          label: 'Coverage A',
          format: 'currency',
          alternateFormat: { steps: [0, 1], display: '$ --' }
        },
        { value: 'premium', component: 'PremiumSection' }
      ]
    },
    headerDetails: {
      constructionType: 'MASONRY',
      county: 'SARASOTA',
      floodZone: 'X',
      premium: 2667,
      propertyAddress: {
        address1: '4131 TEST ADDRESS',
        address2: '',
        csz: 'SARASOTA, FL 00001'
      },
      quoteNumber: '12-345-67',
      yearBuilt: 1998,
      coverageLimits: { dwelling: { amount: 1999999 }}
    },
    currentStep: 1,
    handleRecalc: () => {},
    goToStep: () => {},
    isRecalc: false,
    isLoading: false,
    showNavigationTabs: true,
  };

  const workflowSections = [
    {
      name: 'tab-nav-1',
      status: 'selected'
    },
    {
      name: 'tab-nav-2',
      status: 'active'
    },
    {
      name: 'tab-nav-3',
      status: 'disabled'
    },
    {
      name: 'tab-nav-4',
      status: 'disabled'
    },
    {
      name: 'tab-nav-5',
      status: 'disabled'
    },
    {
      name: 'tab-nav-6',
      status: 'disabled'
    },
    {
      name: 'tab-nav-7',
      status: 'disabled'
    }
  ];

  it('POS:Tests Detail Header', () => {
    const { getByText, queryByText } = renderWithReduxAndRouter(<WorkflowNavigation {...props} />);
    // All static data pulled off dummy quote used above
    expect(getByText('Quote Number'));
    expect(getByText('12-345-67'));
    expect(getByText('Address'));
    expect(getByText('4131 TEST ADDRESS'));
    expect(getByText('Year Built'));
    expect(getByText('1998'));
    expect(getByText('Construction Type'));
    expect(getByText('MASONRY'));
    expect(getByText('Coverage A'));
    expect(queryByText('$ 1,999,999')).not.toBeInTheDocument();
    expect(getByText('$ --'));
    expect(getByText('Premium'));
    expect(getByText('$ 2,767'));
  });

  it('POS:Tests Workflow Section Classes', () => {
    const { getByTestId } = renderWithReduxAndRouter(<WorkflowNavigation {...props} />);

    workflowSections.forEach(({ name, status }) => expect(getByTestId(name).firstChild).toHaveClass(status));
  });

  it('POS:Shows updated Coverage A after going to Customize step', () => {
    const newProps = {
      ...props,
      currentStep: 2
    };

    const { getByText } = renderWithReduxAndRouter(<WorkflowNavigation {...newProps} />);
    expect(getByText('$ 1,999,999'));
  });
});
