import React from 'react';
import { shallow } from 'enzyme';
import { RadioInput } from './RadioField';
import FieldHint from './FieldHint';
import RadioOption from './RadioOption';

describe('RadioField', () => {
  it('should render "radio group"', () => {
    const wrapper = shallow(<RadioInput />);

    expect(wrapper).to.exist;
  });
  it('should render FieldHint when provided with name and hint', () => {
    const inputProps = {
      input: {
        name: 'test'
      },
      hint: 'Testing'
    };
    const wrapper = shallow(<RadioInput {...inputProps} />);

    expect(wrapper.find(FieldHint)).to.have.length(1);
  });
  it('should render DisplayField when provided with displayValue', () => {
    const inputProps = {
      displayValue: '123'
    };
    const wrapper = shallow(<RadioInput {...inputProps} />);

    expect(wrapper.containsMatchingElement(
      <input type="text" value={inputProps.displayValue} readOnly />
    )).to.equal(true);
  });
  it('should render RadioOption of length 2 when provided with 2 answers', () => {
    const inputProps = {
      input: {
        onChange: () => {}
      },
      answers: [{
        answer: 'One'
      }, {
        answer: 'Two'
      }, {
        answer: 'Three'
      }]
    };
    const wrapper = shallow(<RadioInput {...inputProps} />);
    expect(wrapper.find(RadioOption)).to.have.length(3);
  });
});
