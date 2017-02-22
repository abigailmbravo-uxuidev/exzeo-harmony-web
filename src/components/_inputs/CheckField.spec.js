import React from 'react';
import { shallow } from 'enzyme';
import { CheckInput } from './CheckField';

describe('CheckInput', () => {
  it('should render "checkfield input" when nothing is provided', () => {
    const wrapper = shallow(<CheckInput />);

    expect(wrapper).to.exist;
  });

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
