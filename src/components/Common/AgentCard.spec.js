import React from 'react';
import { shallow } from 'enzyme';
import AgentCard from './AgentCard';

it('renders AgentCard', () => {
  const wrapper = shallow(<AgentCard
    index="1234" agent={{ status: 1,
      mailingAddress: {},
      primaryPhoneNumber: '1234567890',
      secondaryPhoneNumber: '1234567890',
      faxNumber: '1234567890',
      emailAddress: 'test@typtap.com'
    }}
  />);
  expect(wrapper);
});
