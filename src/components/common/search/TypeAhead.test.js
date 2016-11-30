import React from 'react';
import { mount } from 'enzyme';
import TypeAhead from './TypeAhead';
import Suggestion from './Suggestion';

const suggestions = [{
  heading: 'Group 1',
}, {
  heading: 'Group 2',
}, {
  heading: 'Group 3',
}];

describe('<TypeAhead />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TypeAhead />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should render a list of suggestions', () => {
    wrapper.setProps({ suggestions });
    expect(wrapper.find('Suggestion')).to.have.lengthOf(3);
  });
});
