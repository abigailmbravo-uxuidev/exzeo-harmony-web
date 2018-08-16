import React from 'react';
import PropTypes from 'prop-types';
import PolicyTabs from '../Common/PolicyTabs';
import AgentCard from '../Common/AgentCard';
import PolicyHolderCard from '../Common/PolicyHolderCard';

export const PolicyHolder = ({ policy, policyNumber, agents }) => {
  const { policyHolderMailingAddress } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="policyHolder" policyNumber={policyNumber} />
      <div className="route-content verify">
        {/* Start Policyholders */}
        <div className="detail-group policyholder-details">
          {policy.policyHolders && policy.policyHolders.map((policyHolder, index) => (
            <PolicyHolderCard policyHolder={policyHolder} policyHolderMailingAddress={policyHolderMailingAddress} index={policyHolder._id} phIndex={index} />
           ))}
        </div>
        {/* End Policyholders */}
        {/* Start Agent */}
        <div className="detail-group agent-details">
          <h3 data-test-="agentHeader" className="section-group-header"><i className="fa fa-vcard-o" /> Agent</h3>
          {(agents && agents.filter(a => a.agentCode === policy.agentCode).map(agent =>
            <AgentCard agent={agent} index={agent.agentCode} />
              ))}
        </div>
        {/* End Agent */}
      </div>
    </React.Fragment>);
};

PolicyHolder.propTypes = {
  policy: PropTypes.shape(),
  agents: PropTypes.array,
  policyNumber: PropTypes.string
};

export default PolicyHolder;
