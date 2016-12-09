import React from 'react';
import { mount } from 'enzyme';
import BoolInput from './BoolInput';

describe('<BoolInput />', () => {
  let wrapper;
  const question = {
    question: 'Bool Test',
    id: '123',
    value: false,
  };
  beforeEach(() => {
    wrapper = mount(
      <BoolInput {...question} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  describe('<input />', () => {
    it('should have an input field', () => {
      const result = wrapper.contains(
        <input
          type="checkbox"
          name={question.id}
          checked={question.value}
          onChange={wrapper.node.onChange}
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
