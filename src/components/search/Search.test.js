import React from 'react';
import { mount } from 'enzyme';
import Search from './Search';
import SearchBar from './SearchBar';

describe('<Search />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Search options={{}} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should render a <SearchBar />', () => {
    const result = wrapper.contains(
      <SearchBar
        placeholder={null}
        handleChange={wrapper.node.handleChange}
        handleSubmit={wrapper.node.handleSubmit}
      />,
  );
    expect(result).to.be.true;
  });
});
