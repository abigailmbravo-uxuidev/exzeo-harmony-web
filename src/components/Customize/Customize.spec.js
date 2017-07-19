import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Customize, handleFormSubmit, handleFormChange, handleReset } from './Customize';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Customize component', () => {
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
      handleSubmit() {}
    };
    const wrapper = shallow(<Customize {...props} />);
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
                name: 'getQuote', value: { result: {} }
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
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          completeTask() {},
          batchCompleteTask() { return Promise.resolve(); }
        }
      },
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
      fieldQuestions: [],
      quoteData: {},
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
    handleFormSubmit({}, props.dispatch, props);

    props.appState.data.recalc = true;
    handleFormSubmit({}, props.dispatch, props);

    handleReset(props);
    handleFormChange(props);
  });
});
