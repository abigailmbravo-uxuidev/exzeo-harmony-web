import React from 'react';
import { mount} from 'enzyme';
import PropertyDetails from './PropertyDetails';

describe('Test PropertyDetails component', () => {
  it('should render PropertyDetails', () => {
    const props = {
      quoteNumber: '12-1234567-01', effectiveDate: '2020-01-01', property: { physicalAddress: {}}, selectedAgent: {}
    };
    const wrapper = mount(<PropertyDetails {...props} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
