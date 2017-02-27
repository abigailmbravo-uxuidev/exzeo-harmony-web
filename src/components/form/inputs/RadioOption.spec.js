import React from 'react';
import { shallow } from 'enzyme';
import RadioOption from './RadioOption';

describe('RadioOption', () => {
  it('should render "radio option"', () => {
    const inputProps = {
      onChange: () => {},
      name: 'test',
      size: 1,
      value: 'testing',
      answer: {
        answer: 'testing',
        image: 'test',
      },
    };
    const wrapper = shallow(<RadioOption {...inputProps} />);

    expect(wrapper.containsAnyMatchingElements([
      <input
        type="radio"
        name={inputProps.name}
        value={inputProps.answer.answer}
        checked
      />,
      <label htmlFor={inputProps.name}><span>{inputProps.answer.answer}</span></label>,
    ])).to.equal(true);
  });

  // TODO: Split the above, write tests to simulate on click
  // TODO: Check classnames
});
