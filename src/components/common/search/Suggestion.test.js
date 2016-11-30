import React from 'react';
import { mount } from 'enzyme';
import Suggestion from './Suggestion';

describe('<Suggestion />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Suggestion />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });
});
