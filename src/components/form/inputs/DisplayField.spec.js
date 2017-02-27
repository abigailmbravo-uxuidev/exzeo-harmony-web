import React from 'react';
import { shallow } from 'enzyme';
import DisplayField from './DisplayField';

describe('FieldHint', () => {
  it('should render component when name, label, and value are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'Testing',
      value: 'ok',
    };
    const wrapper = shallow(<DisplayField {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.name} value={inputProps.value} readOnly />,
      <label htmlFor={inputProps.name}>{inputProps.label}</label>,
    ])).to.equal(true);
  });

  it('should render component when name, label, and displayValue are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'Testing',
      displayValue: 'ok',
    };
    const wrapper = shallow(<DisplayField {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.name} value={inputProps.displayValue} readOnly />,
      <label htmlFor={inputProps.name}>{inputProps.label}</label>,
    ])).to.equal(true);
  });
});
