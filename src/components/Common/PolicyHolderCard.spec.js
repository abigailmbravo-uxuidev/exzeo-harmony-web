import React from 'react';
import { shallow } from 'enzyme';
import PolicyHolderCard from './PolicyHolderCard';

it('renders PolicyHolderCard', () => {
  const wrapper = shallow(<PolicyHolderCard
    phIndex={0}
    index="1234"
    policyHolderMailingAddress={{ address2: '123' }}
    policyHolder={{
      primaryPhoneNumber: '1234567890',
      secondaryPhoneNumber: '1234567890',
      faxNumber: '1234567890',
      emailAddress: 'test@typtap.com',
      electronicDelivery: true
    }}
  />);
  expect(wrapper);
});

it('renders PolicyHolderCard electronicDelivery false', () => {
  const wrapper = shallow(<PolicyHolderCard
    phIndex={0}
    index="1234"
    policyHolderMailingAddress={{ }}
    policyHolder={{
      primaryPhoneNumber: '1234567890',
      secondaryPhoneNumber: '1234567890',
      faxNumber: '1234567890',
      emailAddress: 'test@typtap.com',
      electronicDelivery: false
    }}
  />);
  expect(wrapper);
});

