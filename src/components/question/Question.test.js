import React from 'react';
import { mount } from 'enzyme';
import Question from './Question';

describe('<Question />', () => {
  let wrapper;

  const questionProps = {
    question: {
      question: 'ok',
      id: 'test',
      answerType: 'text',
    },
    value: '',
    handleChange: () => {},
  };

  beforeEach(() => {
    wrapper = mount(
      <Question question={{ answerType: 'text' }} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  describe('<input />', () => {
    it('should have an input field', () => {
      const result = wrapper.contains(
        <input
          type="text"
          name={null}
          value=""
          onChange={null}
        />,
      );
      expect(result).to.be.true;
    });
    it('should take in props', () => {
      wrapper.setProps({ ...questionProps });
      const { question, value, handleChange } = questionProps;
      const result = wrapper.contains(
        <input
          type={question.answerType}
          name={question.id}
          value={value}
          onChange={handleChange}
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
