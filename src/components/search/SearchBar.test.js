import React from 'react';
import { mount } from 'enzyme';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <SearchBar />,
    );
  });

  it('should exist', () => {
    expect(wrapper).to.exist;
  });

  describe('<input />', () => {
    it('should have an input field', () => {
      const result = wrapper.contains(
        <input placeholder="Search..." onChange={null} />,
      );
      expect(result).to.be.true;
    });

    it('should have default placeholder text of "Search..."', () => {
      const result = wrapper.contains(
        <input placeholder="Search..." onChange={null} />,
      );
      expect(result).to.be.true;
    });

    it('should accept a placeholder option for input', () => {
      wrapper.setProps({ placeholder: 'Waffles!' });
      const result = wrapper.contains(
        <input placeholder="Waffles!" onChange={null} />,
      );
      expect(result).to.be.true;
    });
  });

  describe('onChange', () => {
    it('should fire a handleChange event when changed', () => {
      const handleChange = sinon.spy();
      wrapper.setProps({ handleChange });
      wrapper.find('input').simulate('change');
      expect(handleChange.calledOnce).to.be.true;
    });
  });

  describe('<form>', () => {
    it('should exist', () => {
      const result = wrapper.contains(
        <form onSubmit={null}>
          <input placeholder="Search..." onChange={null} />
          <button className="btn btn-success"><i className="fa fa-search" /> Search</button>
        </form>,
      );
      expect(result).to.be.true;
    });
  });

  describe('onSubmit', () => {
    it('should fire handleSubmit event when submitted', () => {
      const handleSubmit = sinon.spy();
      wrapper.setProps({ handleSubmit });
      wrapper.find('form').simulate('submit');
      expect(handleSubmit.calledOnce).to.be.true;
    });
  });
});
