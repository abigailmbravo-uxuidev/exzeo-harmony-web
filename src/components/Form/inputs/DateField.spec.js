import React from 'react';
import { shallow } from 'enzyme';
import DateFieldComponent, { DateInput } from './DateField';

describe('DateInput', () => {
  it('should render "text input" when nothing is provided', () => {
    const wrapper = shallow(<DateFieldComponent />);
    expect(wrapper.instance().props.type).toEqual('text');
  });

  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateFieldComponent {...inputProps} />);

    expect(wrapper.instance().props.input.name).toEqual('testing');
  });

  it('DateInput test', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateInput {...inputProps} />);
    expect(wrapper);
  });
});
