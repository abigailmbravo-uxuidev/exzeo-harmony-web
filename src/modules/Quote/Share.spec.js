import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { Share } from './Share';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Share component', () => {
  const baseProps = {
    underwritingExceptions: [],
    isLoading: false,
    quote: {},
    customHandlers: {
      setEmailPopup: x => x,
      getState: () => ({ showEmailPopup: false }),
      updateQuote: x => x,
      handleSubmit: x => x,
      goToStep: x => x,
      history: {
        replace: x => x,
      }
    },
    initialValues: { underwritingExceptions: []},
    formInstance: {
      getState: () => ({ submitting: false })
    },
    updateQuote() {},
    handleSubmit() {},
  };
  it('should render', () => {

    const wrapper = shallow(<Share {...baseProps} />);
    expect(wrapper);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.shareQuoteSubmit({});
    wrapperInstance.noShareSubmit({});
    wrapperInstance.refreshUWReviewError();
    wrapperInstance.redirectToNewQuote();
  });

  it('should test connected app', () => {
    const initialState = {
      quoteState: {
        quote: {},
        state: {
          underwritingExceptions: []
        }
      },
      appState: {
        isLoading: false,
      }
    };
    const store = mockStore(initialState);
    const wrapper = shallow(<Share store={store} {...baseProps} />);
    expect(wrapper);
  });
});
