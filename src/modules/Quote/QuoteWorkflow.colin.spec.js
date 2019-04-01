import React from 'react';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import QuoteWorkflowTest from './QuoteWorkflow';
import quoteState from './quoteworkflowStore';
import { ph1Fields, ph2Fields, policyDetailsFields, workflowSections, pageHeaders } from './policyholderFields';

const mockStore = configureStore([]);

describe('Testing Quote component', () => {
    const initialState = {
      agencyState: {},
      authState: {},
      service: {
        zipCodeSettings: {}
      },
      appState: {},
      error: {},
      quoteState
    };

    const store = mockStore(initialState);
    const props = {
      history: {},
      location: {
        pathname: ''
      },
      auth: {
        logout: x => x,
      },
      match: {
        params: {}
      },
      setPolicySearch() { }
    };

    it('should test connected component', () => {
      const wrapper = mount(
        <Router>
          <Provider store={store}>
            <QuoteWorkflowTest {...props} />
          </Provider>
        </Router>
      )
      expect(wrapper)
    })
});
