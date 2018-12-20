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
      history: [],
      quote: {},
      updateQuote() {},
      fieldValues: {
        isAdditional: false
      },
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
    const wrapper = shallow(<PremiumFinance {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            uiQuestions: [],
            activeTask: {
              name: 'bb'
            }
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      updateQuote() {},
      history: [],
      fieldValues: {
        isAdditional: false
      },
      quoteData: {
        additionalInterests: []
      },
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          completeTask() {}
        }
      },
      fieldQuestions: [],
      dispatch: store.dispatch,
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {},
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
            uiQuestions: []
          }
        }
      },
      handleSubmit() {},
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
