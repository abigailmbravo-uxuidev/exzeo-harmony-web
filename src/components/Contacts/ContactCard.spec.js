import React from 'react';
import { mount } from 'enzyme';
import ContactCard from './ContactCard';

describe('Test ContactCard component', () => {
  it('should render defaults', () => {
    const props = {};

    const component = mount(<ContactCard {...props} />);
    expect(component.exists()).toBeTruthy();
  });

  it('should render with complete props', () => {
    const props = {
      icon: 'fa fa-user-circle',
      name: 'Tester McTesterson',
      title: 'Bossman',
      phone: '8135554321',
      cell: '8131112345',
      extension: '0987',
      email: 'boss@man.com',
      address1: '123 Test Ln',
      address2: 'Apt 100',
      city: 'Tampa',
      state: 'FL',
      zip: '33611',
      message: 'So many messages.',
      disclaimer: 'Take it easy.'
    };

    const component = mount(<ContactCard {...props} />);
    expect(component.exists()).toBeTruthy();
  });
});
