import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import QuoteWorkflowTest from './QuoteWorkflow';

const mockStore = configureStore([]);

describe('Testing Quote component', () => {
  it('should test connected component', () => {
    const initialState = {
      authState:{
        userProfile: {
          entity: {}
        }
      },
      service: {
        zipCodeSettings: {}
      },
      appState: {},
      quoteState: {
        quote: {},
        state: {
          uiQuestions: []
        },
      },
    };
    const store = mockStore(initialState);
    const props = {
      location: {
        pathname: ''
      },
      auth: {
        logout: x => x,
      },
      match: {},
      setPolicySearch() {}
    };
    const wrapper = shallow(<QuoteWorkflowTest store={store} {...props} />);
    expect(wrapper);
  });

  // it('should test PolicySearch', () => {
  //   const props = {
  //     auth: {
  //       logout: x => x,
  //     },
  //     history: {
  //       replace: x => x,
  //     },
  //     location: {
  //       pathname: '/',
  //     },
  //     match: {},
  //     isLoading: false,
  //     quote: {},
  //     workflowState: { completedTasks: [] },
  //     submitForm: x => x,
  //     updateQuote: x => x,
  //   };
  //   const wrapper = shallow(<QuoteWorkflow {...props} />);
  //   expect(wrapper);
  //   wrapper.instance().setRecalc(true);
  //   wrapper.instance().handlePremiumRecalc();
  //   wrapper.instance().handleUpdateQuote();
  //   wrapper.instance().goToStep('test');
  // });
});
