import React from 'react';
import { mount} from 'enzyme';
import PolicyHolderDetails from './PolicyHolderDetails';

describe('Test PolicyHolderDetails component', () => {
  it('should render PolicyHolderDetails', () => {
    const props = {
      policyHolders: [{ firstName: 'dd', lastName: 'ff', primaryPhoneNumber: '123456789', emailAddress: 'm@m.com' }]
    };
    const wrapper = mount(<PolicyHolderDetails {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
