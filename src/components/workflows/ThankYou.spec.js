import React from 'react';
import { shallow } from 'enzyme';
import ThankYou from './ThankYou';

describe('ThankYou', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<ThankYou />);

    expect(wrapper).to.exist;
  });
});
