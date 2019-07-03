import React from 'react';
import { shallow } from 'enzyme';
import AgentCard from './AgentCard';

describe('AgentCard', () => {
  it('renders AgentCard', () => {
    const wrapper = shallow(
      <AgentCard
        index="1234"
        agent={{
          status: 1,
          mailingAddress: {},
          primaryPhoneNumber: '1234567890',
          secondaryPhoneNumber: '1234567890',
          faxNumber: '1234567890',
          emailAddress: 'test@typtap.com'
        }}
      />
    );
    expect(wrapper);
  });

  it('renders AgentCard AOR appointed', () => {
    const wrapper = shallow(
      <AgentCard
        index="1234"
        agent={{
          status: 1,
          agentOfRecord: true,
          appointed: true,
          mailingAddress: { address1: '343', address2: '34' },
          primaryPhoneNumber: '1234567890',
          secondaryPhoneNumber: '1234567890',
          faxNumber: '1234567890',
          emailAddress: 'test@typtap.com'
        }}
      />
    );
    expect(wrapper);
  });
});
