import React from 'react';
import { shallow } from 'enzyme';
import { SelectField } from './SelectField';
import FieldHint from './FieldHint';

describe('SelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<SelectField />);
    expect(wrapper);
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should render FieldHint when provided with name and hint', () => {
    const inputProps = {
      input: {
        name: 'test'
      },
      hint: 'testing'
    };
    const wrapper = shallow(<SelectField {...inputProps} />);
    expect(wrapper.find(FieldHint).length).toEqual(1);
  });

  it('should render "select input" with answers when answers are provided', () => {
    const inputProps = {
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };
    const wrapper = shallow(<SelectField {...inputProps} />);

    expect(wrapper);
    // Need to take into account blank option
    expect(wrapper.find('option').length).toEqual((4));
  });
  
  it('should add name to class when provided', () => {
    const inputProps = {
      input: {
        name: 'test'
      }
    };
    const wrapper = shallow(<SelectField {...inputProps} />);
    expect(wrapper.find('.form-group').hasClass(inputProps.input.name)).to.equal(true);
  });
  
  it('should add styleName to class when provided', () => {
    const inputProps = {
      styleName: 'test'
    };
    const wrapper = shallow(<SelectField {...inputProps} />);
    expect(wrapper.find('.form-group').hasClass(inputProps.styleName)).to.equal(true);
  });
});
