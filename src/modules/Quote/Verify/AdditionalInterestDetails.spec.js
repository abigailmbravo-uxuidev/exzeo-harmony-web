import React from 'react';
import { mount} from 'enzyme';
import AdditionalInterestDetails from './AdditionalInterestDetails';

describe('Test AdditionalInterestDetails component', () => {
  it('should render', () => {
    const props = {
      additionalInterests: []
    };
    const wrapper = mount(<AdditionalInterestDetails {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
