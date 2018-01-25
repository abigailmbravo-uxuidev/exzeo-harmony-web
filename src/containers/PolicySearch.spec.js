import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import ConnectedApp, { PolicySearch } from './PolicySearch';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Quote component', () => {
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
      actions: {
        searchActions: {
          setPolicySearch() {}
        }
      }
    };
    const wrapper = shallow(<ConnectedApp store={store} {...props} />);
    expect(wrapper);
  });

  it('should test PolicySearch', () => {
    const initialState = {
      search: {},
      actions: {
        searchActions: {
          setPolicySearch() {}
        }
      }
    };
    const store = mockStore(initialState);
    const props = {
      search: {},
      actions: {
        searchActions: {
          setPolicySearch() {}
        }
      }
    };
    const wrapper = shallow(<PolicySearch store={store} {...props} />);
    expect(wrapper);
    wrapper.instance().componentDidMount();
  });
});
