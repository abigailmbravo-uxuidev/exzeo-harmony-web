import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import failedSubmission from '../Common/reduxFormFailSubmit';
import ConnectedApp, { Customize, handleFormSubmit, handleFormChange, handleReset } from './Customize';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Customize component', () => {
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
      handleSubmit() {}
    };
    const wrapper = shallow(<Customize {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      cg: {
        bb: {
          data: {
            modelInstanceId: '123',
            model: {
              variables: [{
                name: 'getQuote', value: { result: {} }
              },
              { name: 'updateQuoteWithUWDecision3',
                value: {
                  result: {
                    quoteNumber: '12-1999999-01'
                  }
                }
              },
              { name: 'updateQuoteWithUWDecision4',
                value: {
                  result: {
                    quoteNumber: '12-1999999-01'
                  }
                }
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
      setRecalc() {},
      updateQuote() {},
      quote: {},
      history: [],
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

    props.appState.isRecalc = true;
    handleFormSubmit({}, props.dispatch, props);

    handleReset(props);
    handleFormChange(props);
    failedSubmission({}, props.dispatch, () => {}, props);
  });
});
