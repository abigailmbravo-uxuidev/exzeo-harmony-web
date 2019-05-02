import React from 'react';
import { mount} from 'enzyme';
import PolicyHolderPopup from './PolicyHolderPopup';

describe('Test PolicyHolderPopup component', () => {
  it('should render PolicyHolderPopup', () => {
    const props = {
      handleSubmit() {},
      handleFormSubmit() {},
      handleCancel(){},
      initialValues: {},
      submitting: false
    };
    const wrapper = mount(<PolicyHolderPopup {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
