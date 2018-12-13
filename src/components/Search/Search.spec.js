import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Search, handleSelectAddress, handleSelectQuote } from './Search';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Search component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      getQuote() {},
      createQuote() {},
      clearResults() {},
      clearQuote() {},
      actions: {
        appStateActions: {
          setAppState() {}
        }
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
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper);
    const address = {
      physicalAddress:
      {
        address1: '1000 Poplar Ave',
        address2: null,
        city: 'Tampa',
        state: 'FL',
        county: 'Hillsborough',
        zip: '33607',
        latitude: 28.0959571,
        longitude: -82.5380074
      }
    };

    wrapper.instance().handleSelectAddress(address);
    wrapper.instance().handleSelectQuote(props.quoteData);
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
        quoteState: 'Quote Started'
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
  });
});
