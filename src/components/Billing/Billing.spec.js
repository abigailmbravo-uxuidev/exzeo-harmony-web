import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Billing, handleFormSubmit, getSelectedPlan, InstallmentTerm } from './Billing';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Billing component', () => {
  it('should test props and render', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [{
                name: 'quote',
                value: {
                  result: {}
                }
              }]
            },
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      paymentPlanResult: {
        options: []
      },
      fieldQuestions: [],
      fieldValues: {
      },
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      handleSubmit() {}
    };
    const wrapper = shallow(<Billing {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [{
                name: 'quote',
                value: {
                  result: {}
                }
              }]
            },
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
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

    const paymentPlans = {
      options: [
        {
          billToType: '',
          billToId: '',
          displayText: '',
          payPlans: ['Annual', 'Semi-Annual', 'Quarterly']
        }
      ]
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    handleFormSubmit({}, props.dispatch, props);
    InstallmentTerm(paymentPlans, ['Annual', 'Semi-Annual', 'Quarterly']);

    expect(getSelectedPlan('Annual')).toEqual('annual');
    expect(getSelectedPlan('Semi-Annual')).toEqual('semiAnnual');
    expect(getSelectedPlan('Quarterly')).toEqual('quarterly');
  });
});
