import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<SearchBar />);

    expect(wrapper).to.exist;
  });
});
