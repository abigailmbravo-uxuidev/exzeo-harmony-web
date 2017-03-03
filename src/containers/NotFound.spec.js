import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper).to.exist;
  });
});
