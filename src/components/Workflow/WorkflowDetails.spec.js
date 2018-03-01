import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { WorkflowDetails, getClassForStep, goToStep, getQuoteFromModel, handleRecalc } from './WorkflowDetails';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing WorkflowDetails component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      actions: {
        cgActions: {
          completeTask: (modelName, workflowId, taskName, taskData) => true
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<WorkflowDetails {...props} />);
    expect(wrapper);
    wrapper.instance().componentWillReceiveProps({ ...props });
  });

  it('should test connected app', () => {
    const initialState = {
      service: {
        quote: {}
      },
      cg: {
        bb: {
          data: {
            activeTask: {
              name: 'step'
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      appState: {
        modelName: 'bb'
      },
      form: {
        Customize: {
          values: {
            dwellingAmount: 100000,
            otherStructuresAmount: 100000,
            personalPropertyAmount: 100000,
            personalPropertyReplacementCostCoverage: false,
            propertyIncidentalOccupanciesMainDwelling: false,
            propertyIncidentalOccupanciesOtherStructures: false,
            lossOfUse: 10000,
            liabilityIncidentalOccupancies: true,
            calculatedHurricane: 2000
          }
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      tasks: {
        bb: {
          data: {
            activeTask: {
              name: 'step'
            },
            modelInstanceId: '123',
            model: {},
            uiQuestions: []
          }
        }
      },
      actions: {
        cgActions: {
          completeTask() {},
          batchCompleteTask() { return Promise.resolve(); }
        },
        appStateActions: {
          setAppState() { return Promise.resolve(); }
        },
        serviceActions: {
          getQuote() { return Promise.resolve({ payload: [{ data: { quote: {} } }] }); }
        }
      },
      quote: {
        _id: '2345'
      },
      workflowModelName: 'bb',
      service: {
        quote: {}
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          quote: {
            _id: 112
          },
          submitting: false
        }
      },
      customizeFormValues: {
        dwellingAmount: 100000,
        otherStructuresAmount: 100000,
        personalPropertyAmount: 100000,
        personalPropertyReplacementCostCoverage: false,
        propertyIncidentalOccupanciesMainDwelling: false,
        propertyIncidentalOccupanciesOtherStructures: false,
        lossOfUse: 10000,
        liabilityIncidentalOccupancies: true,
        calculatedHurricane: 2000
      }
    };
    getClassForStep('step', props);
    goToStep(props, 'step');
    getQuoteFromModel(initialState, props);
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    wrapper.render();
    handleRecalc(props);
  });
});
