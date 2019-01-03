import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';
import ConnectedApp, { CustomerInfo, handleFormSubmit } from './CustomerInfo';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing CustomerInfo component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      history: [],
      quote: {},
      updateQuote() {},
      uiQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        },
        modelName: 'bb'
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
      handleSubmit() {}
    };
    const wrapper = shallow(<CustomerInfo {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      service: {
        agents: []
      },
      quoteState: {},
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
      updateQuote() {},
      history: [],
      zipCodeSettings: {
        timezone: 'American/NewYork'
      },
      fieldQuestions: [],
      quote: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    handleFormSubmit({
      phoneNumber: ''
    }, props.dispatch, props);
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
