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
      isLoading: false,
      answers: {
        products: [
          { answer: 'HO3', label: 'HO3' },
          { answer: 'AF3', label: 'AF3' }
        ]
      }
    };
    const wrapper = shallow(<QuoteSearch {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
