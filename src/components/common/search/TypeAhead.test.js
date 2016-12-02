import React from 'react';
import { mount } from 'enzyme';
import TypeAhead from './TypeAhead';

const suggestions = {
  search: [{
    heading: 'Group 1',
    mapping: {},
    results: [],
    count: 3,
  }, {
    heading: 'Group 2',
    mapping: {},
    results: [],
    count: 3,
  }, {
    heading: 'Group 3',
    mapping: {},
    results: [],
    count: 3,
  }],
};

describe('<TypeAhead />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TypeAhead data={suggestions} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should render a list of suggestions', () => {
    expect(wrapper.find('Suggestion')).to.have.lengthOf(3);
  });
});
