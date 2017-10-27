import React from 'react';
import { shallow } from 'enzyme';
import { DateWebInput } from './DateFieldWeb';

describe('DateWebInput', () => {
  it('should render "text input" when nothing is provided', () => {
    const wrapper = shallow(<DateWebInput />);
    expect(wrapper.instance().props.type).toEqual('text');
  });

  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateWebInput {...inputProps} />);

    expect(wrapper.instance().props.input.name).toEqual('testing');
  });
});
