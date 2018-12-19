import React from 'react';
import configureStore from 'redux-mock-store';
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
      quote: {},
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
      quoteState: { quote: {}},
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      history: [],
      setAppState(){},
      updateQuote() {},
      handleSubmit() {},
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
    handleOnSubmit({}, props.dispatch, props);
  });
});
