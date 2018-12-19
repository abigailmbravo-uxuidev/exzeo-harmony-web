import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import failedSubmission from '../Common/reduxFormFailSubmit';
import ConnectedApp, { AdditionalInsured, handleFormSubmit, closeAndSavePreviousAIs, handleInitialize } from './AdditionalInsured';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing AddAdditionalInterest component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      history: [],
      quote: {},
      updateQuote() {},
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
    const wrapper = shallow(<AdditionalInsured {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
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
      setAppState(){},
      handleSubmit() {},
      updateQuote() {},
      history: [],
      quote: {
        additionalInterests: []
      },
      fieldQuestions: [],
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

    handleFormSubmit({ isAdditional: true, isAdditional2: true }, props.dispatch, props);
    AdditionalInsured(props);
    closeAndSavePreviousAIs(props);
    handleInitialize(initialState);
    failedSubmission({}, props.dispatch, () => {}, props);
  });
});
