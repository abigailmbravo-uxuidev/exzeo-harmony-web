import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { AddAdditionalInterest } from './AddAdditionalInterest';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddAdditionalInterest component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      history: [],
      quote: {},
      updateQuote() {},
      handleSubmit() {},
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<AddAdditionalInterest {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      appState: {
        modelName: 'bb',
        data: {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      updateQuote() {},
      handleSubmit() {},
      history: [],
      quote: {},
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<AddAdditionalInterest store={store} {...props} />);
    expect(wrapper);
    const instance = wrapper.instance();

    instance.noAddAdditionalInterestSubmit({}, props.dispatch, props);
    instance.goToStep('Mortgagee');
    instance.goToStep('PremiumFinance');
    instance.goToStep('Bill Payer');
    instance.goToStep('Additional Interest');
    instance.goToStep('Additional Insured');
    instance.returnTaskName('Mortgagee');
    instance.returnTaskName('PremiumFinance');
    instance.returnTaskName('Bill Payer');
    instance.returnTaskName('Additional Interest');
    instance.returnTaskName('Additional Insured');
    instance.returnTaskDataName('Mortgagee');
    instance.returnTaskDataName('PremiumFinance');
    instance.returnTaskDataName('Bill Payer');
    instance.returnTaskDataName('Additional Interest');
    instance.returnTaskDataName('Additional Insured');
    instance.AddInterest();
    instance.openDeleteAdditionalInterest({}, props);
    instance.hideAdditionalInterestModal(props);
    instance.deleteAdditionalInterest({}, props);
  });
});
