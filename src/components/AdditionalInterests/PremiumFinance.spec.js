import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import failedSubmission from '../Common/reduxFormFailSubmit';
import ConnectedApp, { PremiumFinance, handleFormSubmit, closeAndSavePreviousAIs, handleInitialize, setPremiumFinanceValues } from './PremiumFinance';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddPremiumFinance component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      updateQuote() {},
      setAppState(){},
      handleSubmit() {},
      history: [],
      fieldValues: {
        isAdditional: false
      },
      quote: {
        additionalInterests: []
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<PremiumFinance {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      updateQuote() {},
      setAppState(){},
      handleSubmit() {},
      history: [],
      fieldValues: {
        isAdditional: false
      },
      quote: {
        additionalInterests: []
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);

    handleFormSubmit({ isAdditional: true }, props.dispatch, props);
    PremiumFinance(props);
    closeAndSavePreviousAIs(props);
    handleInitialize(initialState);
    failedSubmission({}, props.dispatch, () => {}, props);

    const selectedPF = {
      AIName1: 'One',
      AIName2: 'Two',
      AIAddress1: 'One Main Street',
      AICity: 'Tampa',
      AIState: 'FL',
      AIZip: '33607'
    };
    setPremiumFinanceValues(selectedPF, props);
    setPremiumFinanceValues(null, props);
  });
});
