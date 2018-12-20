import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Workflow } from './Workflow';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Workflow component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      tasks: {
        quoteModel: {
          data: {
            modelInstanceId: '123',
            model: {},
            activeTask: {
              name: 'first',
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
      actions: {
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          startWorkflow() { return Promise.resolve(); },
          completeTask() {},
          batchCompleteTask() { return Promise.resolve(); }
        },
        serviceActions: {
          clearPolicyResults() {}
        }
      },
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

    const wrapper = shallow(<Workflow {...props} />);
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
          startWorkflow() { return Promise.resolve(); },
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

    wrapper.instance().componentDidMount();
  });

  it('should test Workflow', () => {
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
      actions: {
        serviceActions: {
          clearPolicyResults() {}
        },
        appStateActions: {
          setAppState() {}
        },
        cgActions: {
          completeTask() {},
          startWorkflow() { return Promise.resolve(); }
        }
      },
      tasks: {
        quoteModel: {
          data: {
            modelInstanceId: '123',
            model: {},
            activeTask: {
              name: 'step2',
              value: {
                result: {
                  quoteNumber: '12-1999999-01'
                }
              }
            },
            previousTask: {
              name: 'step1',
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
    const wrapper = shallow(<Workflow store={store} {...props} />);
    expect(wrapper);
  });
});
