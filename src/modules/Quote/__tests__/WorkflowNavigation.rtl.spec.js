import React from 'react';
import 'jest-dom/extend-expect';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  quote
} from '../../../test-utils';
import ConnectedWorkflowNavigation from '../WorkflowNavigation';

describe('Testing WorkflowNavigation Component', () => {
  const props = {
    ...defaultProps,
    handleRecalc: () => {},
    goToStep: () => {},
    isRecalc: false,
    isLoading: false,
    showNavigationTabs: true
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote,
      state: {
        ...defaultInitialState.quoteState.state,
        activeTask: 'askToCustomizeDefaultQuote',
        completedTasks: [
          'askAdditionalCustomerData',
          'askUWAnswers'
        ]
      }
    }
  };

  const workflowSections = [
    {
      name: 'tab-nav-askAdditionalCustomerData',
      status: 'selected'
    },
    {
      name: 'tab-nav-askUWAnswers',
      status: 'selected'
    },
    {
      name: 'tab-nav-askToCustomizeDefaultQuote',
      status: 'active'
    },
    {
      name: 'tab-nav-sendEmailOrContinue',
      status: 'disabled'
    },
    {
      name: 'tab-nav-addAdditionalAIs',
      status: 'disabled'
    },
    {
      name: 'tab-nav-askAdditionalQuestions',
      status: 'disabled'
    },
    {
      name: 'tab-nav-editVerify',
      status: 'disabled'
    }
  ];

  it('POS:Tests Detail Header', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedWorkflowNavigation {...props} />, { state });
    // All static data pulled of dummy quote used above
    expect(getByText('Quote Number'));
    expect(getByText('12-5162296-01'));
    expect(getByText('Address'));
    expect(getByText('4131 TEST ADDRESS'));
    expect(getByText('Year Built'));
    expect(getByText('1998'));
    expect(getByText('Construction Type'));
    expect(getByText('MASONRY'));
    expect(getByText('Coverage A'));
    expect(getByText('$ 314,000'));
    expect(getByText('Premium'));
    expect(getByText('$ 2,767'));
  });

  it('POS:Tests Workflow Section Classes', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedWorkflowNavigation {...props} />, { state });
    workflowSections.forEach(({ name, status }) => expect(getByTestId(name).firstChild).toHaveClass(status));
  });
});
