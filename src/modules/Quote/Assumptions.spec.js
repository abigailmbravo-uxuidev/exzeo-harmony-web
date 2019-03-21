import React from 'react';
import { mount} from 'enzyme';
import Assumptions from './Assumptions';

describe('Test Assumptions component', () => {
  it('should render', () => {
    const props = {
      customHandlers: {
        handleSubmit: x => x,
      }
    };
    const wrapper = mount(<Assumptions {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
