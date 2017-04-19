import React from 'react';
import { shallow } from 'enzyme';
import { DisplayInput } from './DisplayField';

describe('DisplayInput', () => {
  it('should render component when name, label, and value are provided', () => {
    const inputProps = {
      input: {
        name: 'test',
        value: 'ok'
      },
      label: 'Testing'
    };
    const wrapper = shallow(<DisplayInput {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.input.name} value={inputProps.input.value} readOnly />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
    ])).toEqual(true);
  });

  it('should render component when name, label, and displayValue are provided', () => {
    const inputProps = {
      input: {
        name: 'test'
      },
      label: 'Testing',
      displayValue: 'ok'
    };
    const wrapper = shallow(<DisplayInput {...inputProps} />);
    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.input.name} value={inputProps.displayValue} readOnly />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
    ])).toEqual(true);
  });

  it('should render component when name, label, and displayValue, and value are provided, chooses to show displayValue', () => {
    const inputProps = {
      input: {
        name: 'test',
        value: '1234'
      },
      label: 'Testing',
      displayValue: 'ok'
    };
    const wrapper = shallow(<DisplayInput {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.input.name} value={inputProps.displayValue} readOnly />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>
    ])).toEqual(true);
  });
  
  it('should add name to class if provided', () => {
    const inputProps = {
      input: {
        name: 'test'
      }
    };
    const wrapper = shallow(<DisplayInput {...inputProps} />);
    
    expect(wrapper.find('.form-group').hasClass(inputProps.input.name)).to.equal(true);
  });
  
  it('should add styleName to class if provided', () => {
    const inputProps = {
      input: {},
      styleName: 'woop'
    };
    const wrapper = shallow(<DisplayInput {...inputProps} />);
    
    expect(wrapper.find('.form-group').hasClass(inputProps.styleName)).to.equal(true);
  });
});
