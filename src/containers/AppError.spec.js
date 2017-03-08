import React from 'react';
import { shallow } from 'enzyme';
import AppError from './AppError';

describe('AppError', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<AppError />);

    expect(wrapper).to.exist;
  });
});
