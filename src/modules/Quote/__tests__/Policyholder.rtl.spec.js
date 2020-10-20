import React from 'react';

import {
  render,
  fireEvent,
  wait,
  waitForElement,
  defaultQuoteWorkflowProps,
  submitForm,
  checkError,
  verifyForm,
  checkLabel,
  checkTextInput,
  checkHeader,
  checkButton,
  checkPhoneInput,
  checkSelect,
  checkSwitch
} from '../../../test-utils';
import QuoteWorkflow from '../QuoteWorkflow';

const ph1Fields = [
  {
    dataTest: 'policyHolders[0].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    value: 'Bruce'
  },
  {
    dataTest: 'policyHolders[0].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    value: 'Wayne'
  },
  {
    dataTest: 'policyHolders[0].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    value: 'Batman@gmail.com'
  },
  {
    dataTest: 'policyHolders[0].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'phone',
    required: true,
    value: '1234567890'
  }
];

const ph2Fields = [
  {
    dataTest: 'policyHolders[1].firstName',
    error: 'Field Required',
    label: 'First Name',
    type: 'text',
    required: true,
    value: 'Dick'
  },
  {
    dataTest: 'policyHolders[1].lastName',
    error: 'Field Required',
    label: 'Last Name',
    type: 'text',
    required: true,
    value: 'Grayson'
  },
  {
    dataTest: 'policyHolders[1].emailAddress',
    error: 'Field Required',
    label: 'Email Address',
    type: 'text',
    required: true,
    value: 'Robin@hotmail.com'
  },
  {
    dataTest: 'policyHolders[1].primaryPhoneNumber',
    error: 'Field Required',
    label: 'Contact Phone',
    type: 'phone',
    required: true,
    value: '1234567890'
  }
];

const pageHeaders = [
  {
    dataTest: 'Primary Policyholder',
    text: 'Primary Policyholder',
    icon: 'fa fa-user-circle'
  },
  {
    dataTest: 'Secondary Policyholder',
    text: 'Secondary Policyholder',
    icon: 'fa fa-user-circle'
  }
];

describe('Testing QuoteWorkflow Policyholder Page', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/policyholder' },
    match: { params: { step: 'policyholder', quoteNumber: '12-345-67' } }
  };

  const toggleSecondUser = (dir = 'on') => {
    const toggle = document.querySelector(
      '[data-test="additionalPolicyholder"]'
    );
    if (
      (!toggle.classList.contains('active') && dir === 'on') ||
      (toggle.classList.contains('active') && dir === 'off')
    )
      fireEvent.click(toggle);
  };

  it('POS:Secondary Policyholder toggle testing', async () => {
    const { getByTestId, queryByText, getByText } = render(
      <QuoteWorkflow {...props} />
    );
    const secondaryToggle = {
      dataTest: 'additionalPolicyholder',
      label: 'Do you want to add an additional Policyholder?',
      defaultValue: ''
    };
    await checkSwitch(getByTestId, secondaryToggle);
    expect(queryByText('Secondary Policyholder')).not.toBeInTheDocument();
    toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
  });

  it('NEG:Secondary Policyholder Empty Value', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);

    toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
    fireEvent.click(getByTestId(/submit/));
    await wait(() => {
      ph2Fields.forEach(field => checkError(getByTestId, field));
    });
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
    // For all fields except phone, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    await verifyForm(getByTestId, [
      {
        dataTest: 'policyHolders[1].emailAddress',
        value: '∂',
        error: 'Not a valid email address'
      }
    ]);
    await verifyForm(getByTestId, [
      {
        dataTest: 'policyHolders[1].lastName',
        value: '∂',
        error: 'Invalid characters'
      }
    ]);
  });

  it('NEG:Invalid Email Address', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);
    toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
    await verifyForm(getByTestId, [
      {
        dataTest: 'policyHolders[0].emailAddress',
        value: 'invalidemail',
        error: 'Not a valid email address'
      }
    ]);
  });

  it('POS:Checks Headers', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);

    getByTestId('Primary Policyholder');
    toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
    pageHeaders.forEach(header =>
      checkHeader(getByTestId, header.dataTest, header)
    );
  });

  it('POS:Primary / Secondary Policyholder Label / Text', async () => {
    const { getByTestId, getByText } = render(<QuoteWorkflow {...props} />);

    await toggleSecondUser();
    await waitForElement(() => expect(getByText('Secondary Policyholder')));
    [...ph1Fields, ...ph2Fields].forEach(({ dataTest, label, value, type }) => {
      if (type === 'text')
        checkTextInput(getByTestId, { dataTest, value, label });
      if (type === 'phone')
        checkPhoneInput(getByTestId, { dataTest, value, label });
    });
  });

  it('POS:Checks Submit Button', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);
    checkButton(getByTestId);
  });
});
