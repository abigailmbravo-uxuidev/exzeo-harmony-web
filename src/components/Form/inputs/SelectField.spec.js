import React from 'react';
import { shallow } from 'enzyme';
import SelectField, { SelectInput } from './SelectField';

describe('SelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<SelectField name="Test" label="test" />);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      name: 'test',
      label: 'test',
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };

    const wrapper = shallow(<SelectField {...inputProps} />);
    expect(wrapper.prop('answers').length).toEqual(3);
    // Need to take into account blank option
  });


  it('should render SelectInput', () => {
    const inputProps = {
      name: 'test',
      label: 'test',
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };

    const wrapper = shallow(<SelectInput {...inputProps} />);
    expect(wrapper);
  });
});
