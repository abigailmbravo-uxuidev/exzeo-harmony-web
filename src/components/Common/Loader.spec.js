
import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import ConnectedApp, { pageName } from './Loader';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('renders without crashing', () => {
  const initialState = {
    appState: {
      data: {

      }
    }
  };
  const store = mockStore(initialState);
  const props = {
    fieldQuestions: [],
    fieldValues: {
      confirmQuoteDetails: false,
      confirmPolicyHolderDetails: false,
      confirmAdditionalInterestsDetails: false
    },
    quoteData: {},
    dispatch: store.dispatch,
    appState: {
      data: {
        nextPage: 'askAdditionalCustomerData',
        submitting: false,
        showScheduleDateModal: true
      },
      modelName: 'bb'
    },
    tasks: {
      bb: {
        data: {
          modelInstanceId: '123',
          model: {
            variables: [{
              name: 'getFinalQuote',
              value: {
                result: {
                  mailingAddress: {

                  },
                  deductibles: {
                    hurricane: {},
                    allOtherPerils: {}
                  },
                  quoteNumber: '12',
                  property: {
                    physicalAddress: {}
                  },
                  rating: {
                    totalPremium: 1
                  },
                  coverageLimits: {
                    dwelling: {},
                    otherStructures: {},
                    personalProperty: {},
                    lossOfUse: {},
                    personalLiability: {},
                    medicalPayments: {},
                    moldProperty: {},
                    moldLiability: {},
                    ordinanceOrLaw: {}
                  },
                  coverageOptions: {
                    personalPropertyReplacementCost: {}
                  }
                }
              }
            }]
          },
          uiQuestions: [],
          activeTask: {}
        }
      }
    },
    handleSubmit() {}
  };
  const wrapper = shallow(<ConnectedApp store={store} {...props} />);
  expect(wrapper);

  expect(pageName(props)).toEqual('Loading Policyholder');
  props.appState.data.nextPage = 'askUWAnswers';
  expect(pageName(props)).toEqual('Loading Underwriting');
  props.appState.data.nextPage = 'askToCustomizeDefaultQuote';
  expect(pageName(props)).toEqual('Loading Customize');
  props.appState.data.nextPage = 'sendEmailOrContinue';
  expect(pageName(props)).toEqual('Loading Share');
  props.appState.data.nextPage = 'addAdditionalAIs';
  expect(pageName(props)).toEqual('Loading Additional Parties');
  props.appState.data.nextPage = 'askAdditionalQuestions';
  expect(pageName(props)).toEqual('Loading Mailing/Billing');
  props.appState.data.nextPage = 'askScheduleInspectionDates';
  expect(pageName(props)).toEqual('Loading Verify');
  props.appState.data.nextPage = 'blah';
  expect(pageName(props)).toEqual('Loading');
});
