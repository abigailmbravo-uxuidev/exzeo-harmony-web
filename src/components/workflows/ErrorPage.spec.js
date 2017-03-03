import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<ErrorPage />);

    expect(wrapper).to.exist;
  });
});
