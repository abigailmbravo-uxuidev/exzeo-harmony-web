import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { WorkflowDetails, getClassForStep, goToStep, getQuoteFromModel, ShowPremium, handleRecalc } from './WorkflowDetails';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing WorkflowDetails component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      history: [],
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      actions: {
      },
      ...propTypes
    };
    const wrapper = shallow(<WorkflowDetails {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
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
      history: [],
      updateQuote() {},
      quoteState: { state: {} },
      workflowState: { completedTasks: [] },
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
        updateQuote() {},
        cgActions: {
          completeTask() {}
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
    getQuoteFromModel(initialState, props);
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    wrapper.render();
    handleRecalc(props);
  });

  it('should test ShowPremium true', () => {
    const data = {
      isCustomize: true,
      totalPremium: 3423434
    };
    const wrapper = shallow(<ShowPremium {...data} />);
    expect(wrapper);
  });

  it('should test ShowPremium false', () => {
    const data = {
      isCustomize: false,
      totalPremium: 3423434
    };
    const wrapper = shallow(<ShowPremium {...data} />);
    expect(wrapper);
  });
});
