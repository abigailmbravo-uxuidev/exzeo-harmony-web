import React from 'react';
import { mount} from 'enzyme';
import DetailGroup from './DetailGroup';

describe('Test DetailGroup component', () => {
  it('should render DetailGroup', () => {
    const props = {
      children: null,
      header: 'Test',
      detailClass:'test',
      switchName:'testName',
      switchValue: false,
      switchOnChange: x => x,
      handleEditClick: x => x,
    };
    const wrapper = mount(<DetailGroup {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
