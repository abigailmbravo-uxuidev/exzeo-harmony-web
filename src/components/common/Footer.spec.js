import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper).to.exist;
  });
});
