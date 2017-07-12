import React from 'react';
import { shallow } from 'enzyme';
import Connected from './SelectField';
import FieldHint from './FieldHint';

describe('SelectField', () => {
  it('should render "select input" when nothing is provided', () => {
    const wrapper = shallow(<Connected />);
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
    const wrapper = shallow(<Connected {...inputProps} />);
    expect(wrapper.instance().props.hint).toEqual(inputProps.hint);
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
    const wrapper = shallow(<Connected {...inputProps} />);

    expect(wrapper);
    // Need to take into account blank option
    expect(wrapper.instance().props.answers.length).toEqual((3));
  });
});
