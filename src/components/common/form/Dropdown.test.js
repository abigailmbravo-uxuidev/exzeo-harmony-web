import React from 'react';
import { mount } from 'enzyme';
import Dropdown from './Dropdown';

describe('<Dropdown />', () => {
  let wrapper;
  const dropdownProps = {
    question: 'Test',
    answers: ['test1'],
    value: 'test1',
    id: 'testId',
    handleChange: () => {},
  };
  beforeEach(() => {
    wrapper = mount(
      <Dropdown {...dropdownProps} />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  describe('<input />', () => {
    it('should have a select field', () => {
      const result = wrapper.contains(
        <select
          value={dropdownProps.value}
          name={dropdownProps.id}
          onChange={dropdownProps.handleChange}
        >
          <option value={dropdownProps.answers[0]}>{dropdownProps.answers[0]}</option>
        </select>,
      );
      expect(result).to.be.true;
    });
  });

  describe('handleChange', () => {
    it('should fire a handleChange event when changed', () => {
      const handleChange = sinon.spy();
      wrapper.setProps({ handleChange });
      wrapper.find('select').simulate('change');
      expect(handleChange.calledOnce).to.be.true;
    });
  });
});
