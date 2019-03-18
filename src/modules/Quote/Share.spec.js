import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Share from './Share';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Share component', () => {
  // it('should test props and render', () => {
  //   const initialState = {};
  //   const store = mockStore(initialState);
  //   const props = {
  //     history: [],
  //     updateQuote() {},
  //     handleSubmit() {},
  //     underwritingExceptions: [],
  //     fieldQuestions: [],
  //     quote: {},
  //     dispatch: store.dispatch,
  //     appState: {
  //       data: {
  //         submitting: false
  //       }
  //     },
  //   };
  //   const wrapper = shallow(<Share {...props} />);
  //   expect(wrapper);
  //   const wrapperInstance = wrapper.instance();
  //   wrapperInstance.shareQuoteSubmit({}, props.dispatch, props);
  //   wrapperInstance.noShareSubmit({}, props.dispatch, props);
  //   wrapperInstance.shareQuote(props);
  //   wrapperInstance.closeShareSubmit(props);
  //   wrapperInstance.refreshUWReviewError();
  // });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {},
      appState: {
        modelName: 'bb'
      }
    };
    const store = mockStore(initialState);
    const props = {
      updateQuote() {},
      handleSubmit() {},
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
    const wrapper = shallow(<Share store={store} {...props} />);
    expect(wrapper);
  });
});
