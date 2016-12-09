import React from 'react';
import { mount } from 'enzyme';
import TextInput from './TextInput';

describe('<TextInput />', () => {
  let wrapper;
  const question = {
    question: 'Bool Test',
    description: 'Test',
    answerType: 'text',
    id: '123',
    value: '',
  };
  beforeEach(() => {
    wrapper = mount(
      <TextInput />,
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
  });

  describe('<input />', () => {
    it('should accept the question, answerType, id, and value props', () => {
      wrapper.setProps({ ...question });
      const result = wrapper.contains(
        <input
          type={question.answerType}
          name={question.id}
          value={question.value}
          onChange={null}
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

  describe('Set props and render the whole element', () => {
    it('should <TextInput />', () => {
      wrapper.setProps({ ...question });
      const result = wrapper.contains(
        <div className="form-group">
          <label htmlFor={question.id}>{question.question}</label>
          <input
            type={question.answerType}
            name={question.id}
            value={question.value}
            onChange={null}
          />
          <small>{question.description}</small>
        </div>,
      );
      expect(result).to.be.true;
    });
  });
});
