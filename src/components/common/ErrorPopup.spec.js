import React from 'react';
import { shallow } from 'enzyme';
import ErrorPopup from './ErrorPopup';

describe('ErrorPopup', () => {
  it('Should render when no props are passed in', () => {
    const wrapper = shallow(<ErrorPopup />);

    expect(wrapper).to.exist;
  });
});
