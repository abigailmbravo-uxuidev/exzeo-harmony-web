import React from 'react';
import PropTypes from 'prop-types';
import normalizePhone from '../Form/normalizePhone';

const AgentCard = ({ agent }) => (
  <React.Fragment>
    <section className="display-element policy-holder">
      <dl>
        <div>
          <dt className="policyholderName">Agent Name</dt>
          <dd className="policyholderName">{agent.firstName} {agent.lastName}</dd>
        </div>
        <div>
          <dt className="policyholderPhone">Phone</dt>
          <dd className="policyholderPhone">{normalizePhone(agent.primaryPhoneNumber)}</dd>
        </div>
        { agent.secondaryPhoneNumber &&
        <div>
          <dt className="policyholderPhone">Phone</dt>
          <dd className="policyholderPhone">{normalizePhone(agent.secondaryPhoneNumber)}</dd>
        </div>
   }
        <div>
          <dt className="policyholderEmail">Email</dt>
          <dd className="policyholderEmail">{agent.emailAddress}</dd>
        </div>
      </dl>
      <dl>
        <div>
          <dt className="agent.mailingAddress">Mailing Address</dt>
          <dd className="agent.mailingAddress">{`${agent.mailingAddress.address1} ${agent.mailingAddress.address2 ? agent.mailingAddress.address2 : ''}
${agent.mailingAddress.city}, ${agent.mailingAddress.state} ${agent.mailingAddress.zip}`}</dd>
        </div>
      </dl>
    </section>
  </React.Fragment>
);


AgentCard.propTypes = {
  agent: PropTypes.shape()
};

export default AgentCard;
