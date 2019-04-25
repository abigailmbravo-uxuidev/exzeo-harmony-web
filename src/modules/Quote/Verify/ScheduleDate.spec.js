import React from 'react';
import { mount} from 'enzyme';
import ScheduleDate from './ScheduleDate';

describe('Test ScheduleDate component', () => {
  it('should render ScheduleDate', () => {
    const props = {
      handleSubmit() {},
      handleCancel(){}, 
      submitting: false,
      entity: { policyHolders: [{ firstName: 'dd', lastName: 'ff', primaryPhoneNumber: '123456789', emailAddress: 'm@m.com' }]},
      companyName: 'TTIC',
      productDescription: 'Homeowners',
      redirectToHome(){},
      selectedAgent: {}
    };
    const wrapper = mount(<ScheduleDate {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
