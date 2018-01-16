import React from 'react';
import { shallow } from 'enzyme';
import DateInput from './DateField';

describe('DateInput', () => {
  it('should render "text input" when nothing is provided', () => {
    const wrapper = shallow(<DateInput />);
    expect(wrapper.instance().props.type).toEqual('text');
  });

  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateInput {...inputProps} />);

    expect(wrapper.instance().props.input.name).toEqual('testing');
  });
});
