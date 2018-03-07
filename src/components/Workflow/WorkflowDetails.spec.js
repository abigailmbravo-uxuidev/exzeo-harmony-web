import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { WorkflowDetails, getClassForStep, goToStep, getQuoteFromModel, ShowPremium } from './WorkflowDetails';

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
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
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
        data: {
          quote: {
            _id: 112
          },
          submitting: false
        }
      },
      ...propTypes
    };
    getClassForStep('step', props);
    goToStep(props, 'step');
    getQuoteFromModel(initialState, props);
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    wrapper.render();
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
