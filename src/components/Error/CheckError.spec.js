import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import ConnectedApp, { CheckError } from './CheckError';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing CheckError component', () => {
  it('should test props and render', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const props = {
      error: {
        message: 'something went wrong'
      },
      dispatch: store.dispatch,
    };
    const wrapper = shallow(<CheckError {...props} />);
    expect(wrapper);
  });

  it('should test connected app', () => {
    const initialState = {
      error: {},
    };
    const store = mockStore(initialState);

    const wrapper = shallow(<ConnectedApp store={store} />);
    expect(wrapper);
  });
});
