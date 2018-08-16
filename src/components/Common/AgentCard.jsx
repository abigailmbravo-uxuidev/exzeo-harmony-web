import React from 'react';
import PropTypes from 'prop-types';
import normalizePhone from '../Form/normalizePhone';

const AgentCard = ({ agent }) => (
  <section className="display-element agent">
    <dl>
      <div data-test-="agentName">
        <dt className="agentName">Agent Name</dt>
        <dd className="agentName">{agent.firstName} {agent.lastName}</dd>
      </div>
      <div data-test-="agentPhone">
        <dt className="agentPhone">Phone</dt>
        <dd className="agentPhone">{normalizePhone(agent.primaryPhoneNumber)}</dd>
      </div>
      { agent.secondaryPhoneNumber &&
        <div data-test-="agentPhone2">
          <dt className="agentPhone">Phone</dt>
          <dd className="agentPhone">{normalizePhone(agent.secondaryPhoneNumber)}</dd>
        </div>
   }
      <div data-test-="agentEmail">
        <dt className="agentEmail">Email</dt>
        <dd className="agentEmail">{agent.emailAddress}</dd>
      </div>
    </dl>
    <dl>
      <div data-test-="agentMailingAddress">
        <dt className="agentMailingAddress">Mailing Address</dt>
        <dd className="agentMailingAddress">{`${agent.mailingAddress.address1} ${agent.mailingAddress.address2 ? agent.mailingAddress.address2 : ''}
          ${agent.mailingAddress.city}, ${agent.mailingAddress.state} ${agent.mailingAddress.zip}`}</dd>
      </div>
    </dl>
  </section>
);


AgentCard.propTypes = {
  agent: PropTypes.shape()
};

export default AgentCard;
