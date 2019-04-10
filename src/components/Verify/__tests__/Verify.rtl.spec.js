import React from 'react';
import 'jest-dom/extend-expect';

import {
  defaultProps,
  defaultInitialState,
  renderWithReduxAndRouter,
  quote
} from '../../../test-utils';

import ConnectedVerify from '../Verify';

// TODO: Return to this test once Verify has been updated to use reusable component structure
describe('Verify Testing', () => {
  const props = {
    ...defaultProps,
    location: {
      pathname: '/quote/1/mailingBilling'
    }
  };

  const state = {
    ...defaultInitialState,
    quoteState: {
      ...defaultInitialState.quoteState,
      quote
    }
  };

  it('should render', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    expect(getByText('Property Details'));
  });

  it('POS:Property Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    ['Quote Number', 'Property Address', 'Year Built', 'Effective Date',
      '12-5162296-01', /4131 TEST ADDRESS/, '1998', '05/05/2019'
    ].forEach(text => expect(getByText(text)));
  });

  it('POS:Quote Details', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    [/Yearly Premium/, /Dwelling/, /Other Structures/, /Personal Property/, /Loss Of Use/, /Personal Liability/,
      /Medical Payments/, /Personal Property Replacement Cost/, /Mold Property/, /Mold Liability/, /Ordinance or Law/,
      /All Other Perils Deductible/, /Hurricane Deductible/, /Sinkhole Deductible/
    ].forEach(text => expect(getByText(text)));
  });

  it('POS:Policyholder Details Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    expect(getByText(/Please be sure the information below/));
  });

  it('POS:Policyholder Details Primary / Secondary Policyholder', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    [/Name/, /Phone Number/, /Email/].forEach(text => expect(getByText(text)));
  });

  it('POS:Mailing Address Text', () => {
    const { getByText } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    [/Street Address/, /City\/State\/Zip/, /Country/].forEach(text => expect(getByText(text)));
  });

  it('POS:Verify Toggle', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    ['confirmProperyDetails', 'confirmQuoteDetails', 'confirmPolicyHolderDetails', 'confirmAdditionalInterestsDetails'
    ].forEach(tag => {
      expect(getByTestId(tag)).toHaveTextContent('Verified');
      // TODO: Update this with reusable test helpers once the Verified oage is uodated
      expect(document.querySelector(`[data-test="${tag}"] div.switch-div`));
      expect(document.querySelector(`[data-test="${tag}"] input[name="${tag}"]`));
    });
  });

  it('POS:Next Button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<ConnectedVerify {...props} />, { state });
    expect(getByTestId('submit').getAttribute('type')).toEqual('submit');
  });
});
