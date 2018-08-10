import React from 'react';
import { shallow } from 'enzyme';
import SideNav from './SideNav';

it('renders without crashing', () => {
  const wrapper = shallow(<SideNav params={{ policyNumber: '123' }} />);
  expect(wrapper);
});
