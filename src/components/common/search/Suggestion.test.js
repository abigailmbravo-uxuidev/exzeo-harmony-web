import React from 'react';
import { mount } from 'enzyme';
import Suggestion from './Suggestion';

const suggestion = {
  heading: 'Waffles',
  count: 10,
};

describe('<Suggestion />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Suggestion suggestion={suggestion} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should display the heading', () => {
    const result = wrapper.contains(
      <span className="heading">{suggestion.heading}</span>,
    );
    expect(result).to.be.true;
  });

  it('should display the count', () => {
    const result = wrapper.contains(
      <span>{suggestion.count}</span>,
    );
    expect(result).to.be.true;
  });
});
