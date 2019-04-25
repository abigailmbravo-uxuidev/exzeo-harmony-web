import React from 'react';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import Verify from './index';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Verify component', () => {
  const baseProps = {
    config:{
      extendedProperties: {
        productDescription: '',
        companyName: '',
        details: [
          { format: 'currency', path: 'rating.totalPremium', label: 'Yearly Premium'},
          { format: 'currency', path: 'coverageLimits.dwelling.amount', label: 'A. Dwelling'},
          { format: 'currency', path: 'coverageLimits.otherStructures.amount', label: 'B. Other Structures'},
          { format: 'currency', path: 'coverageLimits.personalProperty.amount', label: 'C. Personal Property'},
          { format: 'currency', path: 'coverageLimits.lossOfUse.amount', label: 'D. Loss Of Use'},
          { format: 'currency', path: 'coverageLimits.personalLiability.amount', label: 'E. Personal Liability'},
          { format: 'currency', path: 'coverageLimits.medicalPayments.amount', label: 'F. Medical Payments'},
          { format: 'bool', path: 'coverageOptions.personalPropertyReplacementCost.answer', label: 'Personal Property Replacement Cost'},
          { format: 'currency', path: 'coverageLimits.moldProperty.amount', label: 'Mold Property'},
          { format: 'currency', path: 'coverageLimits.moldLiability.amount', label: 'Mold Liability'},
          { format: 'currency', path: 'coverageLimits.ordinanceOrLaw.amount', label: 'Ordinance or Law'},
          { format: 'currency', path: 'deductibles.allOtherPerils.amount', label: 'All Other Perils Deductible'},
          { format: 'currency', path: 'deductibles.hurricane.amount', label: 'Hurricane Deductible'},
          { format: 'currency', path: 'deductibles.sinkhole.amount', label: 'Sinkhole Deductible', hideNoValue: true}
        ]
      }
    },
    agents: [],
    isLoading: false,
    quote: {},
    customHandlers: {
      setShowSendApplicationPopup: x => x,
      getState: () => ({ shouldSendApplication: false }),
      updateQuote: x => x,
      handleSubmit: x => x,
      history: {
        replace: x => x,
      }
    },
    sendApplicationSubmit() {},
    handlePolicyHolderSubmit() {},
  };
  it('should render', () => {

    const wrapper = mount(<Verify {...baseProps} />);
    expect(wrapper);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handlePolicyHolderSubmit({});
    wrapperInstance.sendApplicationSubmit({});
    wrapperInstance.refreshUWReviewError();
    wrapperInstance.redirectToHome();

    wrapperInstance.setConfirmPropertyDetails(false);
    wrapperInstance.setConfirmQuoteDetails(false);
    wrapperInstance.setConfirmPolicyHolderDetails(false);
    wrapperInstance.setConfirmAdditionalInterestsDetails(false);
    wrapperInstance.setPolicyHolderEditPopup(false);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {
        quote: {},
        state: {}
      },
      agencyState:{
        agents: []
      },
      appState: {
        isLoading: false,
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(<Verify store={store} {...baseProps} />);
    expect(wrapper);
  });
});
