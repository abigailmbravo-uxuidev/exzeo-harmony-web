import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import ConnectedApp, { Base } from './Base';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Base component', () => {
  it('should test props and render', () => {
    const initialState = {
      service: {
        currentAgent: {}
      },
      auth: {
        userProfile: {},
        getProfile() {}
      }
    };
    const store = mockStore(initialState);
    const props = {
      match: {
        params: {

        }
      },
      service: {
        currentAgent: {}
      },
      auth: {
        userProfile: {},
        getIdToken() {},
        getProfile() {}
      },
      authState: {
        userProfile: {}
      },
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
    const wrapper = shallow(<Base store={store} {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      service: {
        currentAgent: {}
      },
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
      auth: {
        userProfile: {},
        getIdToken() {},
        getProfile() {}
      },
      fieldQuestions: [],
      quoteData: {},
      dispatch: store.dispatch,
      appState: {
        data: {
          submitting: false
        }
      },
      ...propTypes
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
