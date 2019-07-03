import React from 'react';
import PropTypes from 'prop-types';
import AgentCard from '../Common/AgentCard';
import PolicyHolderCard from '../Common/PolicyHolderCard';

export const PolicyHolder = ({ policy, agents }) => {
  const { policyHolderMailingAddress } = policy;
  return (
    <div className="route-content verify">
      {/* Start Policyholders */}
      <div className="detail-group policyholder-details">
        {policy.policyHolders &&
          policy.policyHolders.map((policyHolder, index) => (
            <PolicyHolderCard
              key={policyHolder._id}
              policyHolder={policyHolder}
              policyHolderMailingAddress={policyHolderMailingAddress}
              index={policyHolder._id}
              phIndex={index}
            />
          ))}
      </div>
      {/* End Policyholders */}
      {/* Start Agent */}
      <div className="detail-group agent-details">
        <h3 data-test="agentHeader" className="section-group-header">
          <i className="fa fa-vcard-o" /> Agent
        </h3>
        {agents &&
          agents
            .filter(a => a.agentCode === policy.agentCode)
            .map(agent => <AgentCard agent={agent} key={agent.agentCode} />)}
      </div>
      {/* End Agent */}
    </div>
  );
};

PolicyHolder.propTypes = {
  policy: PropTypes.shape(),
  agents: PropTypes.array
};

export default PolicyHolder;
