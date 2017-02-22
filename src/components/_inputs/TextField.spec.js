import React from 'react';
import { shallow } from 'enzyme';
import { TextInput } from './TextField';
import FieldHint from './FieldHint';

describe('TextInput', () => {
  it('should render "text input" when nothing is provided', () => {
    const wrapper = shallow(<TextInput />);
    // console.log(wrapper.debug()); // Use for debugging test and seeing output

    expect(wrapper.contains(<input type="text" />)).to.equal(true);
  });

  it('should render "text input" with label, when label and name are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing',
      }
    };
    const wrapper = shallow(<TextInput {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.input.name} />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>,
    ])).to.equal(true);
  });

  it('should render "text input" with FieldHint, when name, label, and hint are provided', () => {
    const inputProps = {
      label: 'Test',
      input: {
        name: 'testing',
      },
      hint: 'Test Hint',
    };
    const wrapper = shallow(<TextInput {...inputProps} />);

    expect(wrapper.find(FieldHint)).to.have.length(1);
    expect(wrapper.containsAnyMatchingElements([
      <input type="text" name={inputProps.input.name} />,
      <label htmlFor={inputProps.input.name}>{inputProps.label}</label>,
    ]));
  });

  const types = [
    'mumber',
    'tel',
    'password',
    'date',
    'email',
    'calendar',
  ];

  types.forEach((type) => {
    it(`should render '${type} input', when given type of ${type} is provided`);
  });

  it('should render "disabled text input", when disabled is provided');
  it('should render "text input" with error, when touched and error are provided');
  it('should render "text input" with error, when touched and warning are provided');
  it('should render "text input" without FieldHint, when name and hint are provided');
  it('should render "text input" without error, when meta with !touched is provided');
  it('should render "text input" without error, when meta with !touched and error are provided');
  it('should render "text input" without error, when meta with !touched and warning are provided');
  it('should render with "form-group" classname when nothing is provided');
  it('should render with "form-group {name}" classname when name is provided');
  it('should render with "form-group disabled" classname when disabled is provided');
  it('should render with "form-group valid" classname when touched and !error are provided');
  it('should render with "form-group error" classname when touched and error are provided');

  // TODO: Check renders
  // TODO: Check classnames
  // TODO: Check props
  // TODO: Check event handlers
});
