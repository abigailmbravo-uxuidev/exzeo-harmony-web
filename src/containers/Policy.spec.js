import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp from './Policy';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Policy component', () => {
  it('should test connected app', () => {
    const initialState = {
      actions: {
        searchActions: {
          setPolicy() {}
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      actions: {
        searchActions: {
          setPolicy() {}
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });
});
