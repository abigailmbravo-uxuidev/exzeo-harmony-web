import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { BillPayer, handleFormSubmit, closeAndSavePreviousAIs, handleInitialize, failedSubmission } from './BillPayer';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddBillPayer component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
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
    const wrapper = shallow(<BillPayer {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
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
    BillPayer(props);
    closeAndSavePreviousAIs(props);
    handleInitialize(initialState);
    failedSubmission({}, props.dispatch, () => {}, props);
  });
});
