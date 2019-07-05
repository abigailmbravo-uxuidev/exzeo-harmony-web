import React from 'react';
import PropTypes from 'prop-types';
import normalizePhone from '../Form/normalizePhone';

const AgentCard = ({ agent }) => (
  <section className="display-element agent">
    <dl>
      <div data-test="agentName">
        <dt>Agent Name</dt>
        <dd>
          {agent.firstName} {agent.lastName}
        </dd>
      </div>
      <div data-test="agentPhone">
        <dt>Phone</dt>
        <dd>{normalizePhone(agent.primaryPhoneNumber)}</dd>
      </div>
      {agent.secondaryPhoneNumber && (
        <div data-test="agentPhone2">
          <dt>Phone</dt>
          <dd>{normalizePhone(agent.secondaryPhoneNumber)}</dd>
        </div>
      )}
      <div data-test="agentEmail">
        <dt>Email</dt>
        <dd>{agent.emailAddress}</dd>
      </div>
    </dl>
    <dl>
      <div data-test="agentMailingAddress">
        <dt>Mailing Address</dt>
        <dd>{`${agent.mailingAddress.address1} ${
          agent.mailingAddress.address2 ? agent.mailingAddress.address2 : ''
        }
          ${agent.mailingAddress.city}, ${agent.mailingAddress.state} ${
          agent.mailingAddress.zip
        }`}</dd>
      </div>
    </dl>
  </section>
);

AgentCard.propTypes = {
  agent: PropTypes.shape()
};

export default AgentCard;
