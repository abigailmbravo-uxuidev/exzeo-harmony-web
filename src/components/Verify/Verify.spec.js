import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Verify, handleFormSubmit, goToStep } from './Verify';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Verify component', () => {
  it('should test props and render', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
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
      tasks: {
        bb: {
          data: {
            modelInstanceId: '123',
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
            model: {
              variables: [{
                name: 'quote', value: { result: {} }
              }]
            },
            uiQuestions: []
          }
        }
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        modelName: 'bb',
        data: {
          submitting: false
        }
      },
      handleSubmit() {}
    };
    const wrapper = shallow(<Verify {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            previousTask: {
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
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
        data: {
          showScheduleDateModal: false
        },
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
          showScheduleDateModal: false,
          submitting: false
        }
      }

    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
    handleFormSubmit({}, props.dispatch, props);
    goToStep(props, 'share');
  });
});
