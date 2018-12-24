import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Share, shareQuoteSubmit, noShareSubmit, shareQuote, closeShareSubmit, refereshUWReviewError } from './Share';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Share component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      updateQuote(){},
      handleSubmit() {},
      setAppState(){},
      underwritingExceptions: [],
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
    };
    const wrapper = shallow(<Share {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      updateQuote(){},
      handleSubmit() {},
      setAppState(){},
      history: [],
      fieldQuestions: [],
      quote: {},
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
    shareQuoteSubmit({}, props.dispatch, props);
    noShareSubmit({}, props.dispatch, props);
    shareQuote(props);
    closeShareSubmit(props);
    refereshUWReviewError(props);
  });
});
