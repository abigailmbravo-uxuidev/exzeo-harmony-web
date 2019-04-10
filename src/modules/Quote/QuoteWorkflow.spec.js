import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';

import QuoteWorkflowTest,{ QuoteWorkflow } from './QuoteWorkflow';

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
      setPolicySearch() {},
      getAgentsByAgencyCode() {},
      getZipcodeSettings() {},
    };
    const wrapper = shallow(<QuoteWorkflowTest store={store} {...props} />);
    expect(wrapper);

    wrapper.instance().componentDidMount();
  });

  it('should test component', () => {
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
      workflowState: { isHardStop: false },
      userProfile: { entity: {} },
      location: {
        pathname: ''
      },
      auth: {
        logout: x => x,
      },
      match: {},
      setPolicySearch() {},
      getAgentsByAgencyCode() {},
      getZipcodeSettings() {},
      submitForm() {},
    };

    const wrapper = shallow(<QuoteWorkflow {...props} />);
    expect(wrapper);

    wrapper.instance().componentDidMount();
  });
});
