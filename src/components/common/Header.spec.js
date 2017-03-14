import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper).to.exist;
  });
});
