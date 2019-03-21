import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicySearch } from './Policy';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing PolicySearch component', () => {
  it('should test connected app', () => {
    const initialState = {
      actions: {
        searchActions: {
          setPolicySearch() {}
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        logout: x => x,
      },
      match: {},
      setPolicySearch() {}
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicySearch', () => {
    const initialState = {
      search: {},
      setPolicySearch() {}
    };
    const store = mockStore(initialState);
    const props = {
      auth: {
        logout: x => x,
      },
      match: {},
      search: {},
      setPolicySearch() {}
    };
    const wrapper = shallow(<PolicySearch store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
  });
});
