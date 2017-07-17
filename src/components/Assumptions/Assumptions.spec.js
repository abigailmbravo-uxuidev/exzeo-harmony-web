import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Assumptions, handleOnSubmit } from './Assumptions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Assumptions component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      fieldQuestions: [],
      fieldValues: {
        confirmAssumptions: false
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
    const wrapper = shallow(<Assumptions {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
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
    handleOnSubmit({}, props.dispatch, props);
  });
});
