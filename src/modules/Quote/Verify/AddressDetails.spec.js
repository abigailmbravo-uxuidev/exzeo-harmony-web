import React from 'react';
import { mount} from 'enzyme';
import AddressDetails from './AddressDetails';

describe('Test AddressDetails component', () => {
  it('should render', () => {
    const props = {
      address: {
        country: 'USA'
      }
    };
    const wrapper = mount(<AddressDetails {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
