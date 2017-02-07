import React from 'react';
import { mount } from 'enzyme';
import RadioGroup from './RadioGroup';

describe('<RadioGroup />', () => {
  let wrapper;
  const radioProps = {
    question: 'Test',
    answers: ['test1'],
    value: 'test1',
    id: 'testId',
    handleChange: () => {},
  };
  beforeEach(() => {
    wrapper = mount(
      <RadioGroup {...radioProps} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  describe('<input />', () => {
    it('should have an input field', () => {
      const result = wrapper.contains(
        <input
          type="radio"
          value={radioProps.answers[0]}
          name={radioProps.id}
          onChange={radioProps.handleChange}
          checked
        />,
      );
      expect(result).to.be.true;
    });
  });

  describe('handleChange', () => {
    it('should fire a handleChange event when changed', () => {
      const handleChange = sinon.spy();
      wrapper.setProps({ handleChange });
      wrapper.find('input').simulate('change');
      expect(handleChange.calledOnce).to.be.true;
    });
  });
});
