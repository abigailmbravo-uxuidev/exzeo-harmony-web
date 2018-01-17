import React from 'react';
import { shallow } from 'enzyme';
import DateWebInputComponent, { DateWebInput } from './DateFieldWeb';

describe('DateWebInput', () => {
  it('should render "text input" when nothing is provided', () => {
    const wrapper = shallow(<DateWebInputComponent />);
    expect(wrapper.instance().props.type).toEqual('text');
  });

  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateWebInputComponent {...inputProps} />);

    expect(wrapper.instance().props.input.name).toEqual('testing');
  });

  it('should render DateWebInput', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing'
      }
    };
    const wrapper = shallow(<DateWebInput {...inputProps} />);
    expect(wrapper);
  });
});
