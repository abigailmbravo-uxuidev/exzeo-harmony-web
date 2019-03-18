import React from 'react';
import { shallow } from 'enzyme/build';
import EmailPopup from './EmailPopup';

describe('Test EmailPopup component', () => {
  const quote = {
    property: { physicalAddress: {} },
    coverageLimits: { dwelling: { amount: '1000'} },
  };

  const baseProps = {
    submitting: false,
    handleSubmit: x => x,
    handleCancel: x => x
  };

  it('should test EmailPopup ', () => {
    const props = { ...baseProps };
    const wrapper = shallow(<EmailPopup {...props} />);
    expect(wrapper);
  });
});
