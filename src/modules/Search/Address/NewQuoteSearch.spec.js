import React from 'react';
import { shallow } from 'enzyme';
import NewQuoteSearch from './NewQuoteSearch';

describe('Test NewQuoteSearch component', () => {
  it('renders without props being passed', () => {
    const answers = {
      products: [
        { answer: 'HO3', label: 'HO3' },
        { answer: 'AF3', label: 'AF3' }
      ]
    };
    const wrapper = shallow(
      <NewQuoteSearch submitting={false} answers={answers} />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
