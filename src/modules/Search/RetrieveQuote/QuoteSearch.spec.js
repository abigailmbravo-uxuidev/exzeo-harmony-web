import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import QuoteSearch from './QuoteSearch';

describe('Testing QuoteSearch component', () => {
  it('should test QuoteSearch', () => {
    const props = {
      auth: {
        logout: x => x
      },
      match: {},
      isLoading: false
    };
    const wrapper = shallow(<QuoteSearch {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
