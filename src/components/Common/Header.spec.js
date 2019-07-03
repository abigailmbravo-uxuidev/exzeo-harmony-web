import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('renders without crashing', () => {
  const props = {
    toggleSideNav: x => x
  };

  const wrapper = shallow(<Header {...props} />);
  expect(wrapper);
});
