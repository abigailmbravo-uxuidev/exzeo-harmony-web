import React from 'react';

import { shallow } from 'enzyme';
import { Verify } from './index';

describe('Testing Verify component', () => {
  const baseProps = {
    formValues: {},
    initialValues: {},
    formInstance: {
      getState: x => ({ submitting: false }),
    },
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
    options: [],
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
    const wrapper = shallow(<Verify {...baseProps} />);
    expect(wrapper.exists()).toBeTruthy();
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handlePolicyHolderSubmit({});
    wrapperInstance.sendApplicationSubmit({});
    wrapperInstance.redirectToHome();
    wrapperInstance.setConfirmation('test', false);
    wrapperInstance.setPolicyHolderEditPopup(false);
  });
});
