import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  clearText,
  checkLabel,
  checkButton,
  checkError,
  submitForm,
  verifyForm,
  quote,
  ph1Fields,
  ph2Fields
} from '../../../test-utils';

import ConnectedQuoteWorkflow from '../QuoteWorkflow';

const switchTags = ['confirmProperty', 'confirmQuote', 'confirmPolicy', 'confirmAdditionalInterest'];

describe('Verify Testing', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/1/verify'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote: {
        ...quote,
        policyHolderMailingAddress: {
          address1: '4131 TEST ADDRESS',
          address2: '',
          city: 'SARASOTA',
          country: {
            code: 'USA',
            displayText: 'United States of America'
          },
          zip: '00001',
          state: 'FL'
        }
      }
    }
  };

  it('NEG:Primary Policyholder Empty Value', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    const phFields = [...ph1Fields, ...ph2Fields];

    fireEvent.click(getByTestId('policyholder-details'));
    ph1Fields.forEach(field => clearText(getByTestId, field));
    submitForm(getByText, 'Save');
    ph1Fields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Secondary Policyholder Empty Value', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });

    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));
    submitForm(getByText, 'Save');
    ph2Fields.forEach(field => checkError(getByTestId, field));
  });

  it('NEG:Primary / Secondary Policyholder Invalid Character', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    // For all fields except phone, we fill out with invalid character data
    // If that field is an email, it will throw a different error
    [...ph1Fields, ...ph2Fields].filter(({ name }) => !name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '∂',
        error: name.includes('email') ? 'Not a valid email address' : 'Invalid characters'
      }]));
  });

  it('NEG:Invalid Email Address', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('email'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: 'invalidemail', error: 'Not a valid email address'
      }]));
  });

  it('NEG:Invalid Contact Phone', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    fireEvent.click(getByTestId('policyholder-details'));
    fireEvent.click(getByTestId('additionalPolicyholder'));

    [...ph1Fields, ...ph2Fields].filter(({ name }) => name.includes('Phone'))
      .forEach(({ name }) => verifyForm(getByTestId, [{
        name, data: '123', error: 'Not a valid Phone Number'
      }]));
  });

  it('NEG:All "Verified" Values left at Default "NO"', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    switchTags.forEach(tag =>
      expect(getByTestId(tag).className.split(' ').includes('active')).toEqual(false)
    );
  });

  it('POS:Property Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    const sectionData = [
      { label: 'Quote Number', value: 'Quote Number12-5162296-01' },
      { label: 'Property Address', value: '4131 TEST ADDRESS' },
      { label: 'Year Built', value: '1998' },
      { label: 'Effective Date', value: '05/05/2019' },
      { label: 'Agent', value: '' }
    ];
    getByText('Property Details').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Quote Details', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    const sectionData = [
      { label: 'Yearly Premium', value: '$' },
      { label: 'A. Dwelling', value: '$' },
      { label: 'B. Other Structures', value: '$' },
      { label: 'C. Personal Property', value: '$' },
      { label: 'D. Loss Of Use', value: '$' },
      { label: 'E. Personal Liability', value: '$' },
      { label: 'F. Medical Payments', value: '$' },
      { label: 'Personal Property Replacement Cost', value: 'Yes' },
      { label: 'Mold Property', value: '$' },
      { label: 'Mold Liability', value: '$' },
      { label: 'Ordinance or Law', value: '$' },
      { label: 'All Other Perils Deductible', value: '$' },
      { label: 'Hurricane Deductible', value: '$' },
      { label: 'Sinkhole Deductible', value: '$' },
    ];
    getByText('Quote Details').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Policyholder Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    expect(getByText(/Please be sure the information below/));
  });

  it('POS:Policyholder Details Primary / Secondary Policyholder', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    const sectionData = [
      { label: 'Name', value: 'Bruce Wayne' },
      { label: 'Phone Number', value: 'Phone Number(123) 123-1231' },
      { label: 'Email', value: 'Batman@gmail.com' }
    ];
    getByText('Primary Policyholder').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Policyholder Modal', () => {
    const { getByText, getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    
    fireEvent.click(getByTestId('policyholder-details'));
    expect(getByText('Edit Policyholder(s)'));
    expect(getByText('Do you want to add an additional Policyholder?'));
    fireEvent.click(getByTestId('additionalPolicyholder'));
    expect(getByText('Primary Policyholder'));
    expect(getByText('Secondary Policyholder'));
  });

  it('POS:Mailing Address Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    const sectionData = [
      { label: 'Street Address', value: '4131 TEST ADDRESS' },
      { label: 'City/State/Zip', value: /SARASOTA/ },
      { label: 'Country', value: 'United States of America' }
    ];
    getByText('Mailing Address').nextSibling.childNodes.forEach((node, i) => {
      expect(node).toHaveTextContent(sectionData[i].label);
      expect(node).toHaveTextContent(sectionData[i].value);
    });
  });

  it('POS:Verify Toggle Labels', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    switchTags.forEach(tag => checkLabel(getByTestId, { name: tag, label: 'Verified' }));
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedQuoteWorkflow {...props} />, { state });
    expect(getByTestId('next').getAttribute('type')).toEqual('button');
    checkButton(getByTestId, { name: 'next' });
  });
});