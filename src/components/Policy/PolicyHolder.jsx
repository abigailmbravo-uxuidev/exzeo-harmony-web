import React from 'react';
import PropTypes from 'prop-types';
import AgentCard from '../Common/AgentCard';
import PolicyTabs from '../Common/PolicyTabs';
import PolicyHolderCard from '../Common/PolicyHolderCard';

export const PolicyHolder = ({ policy, policyNumber, agents }) => {
  const { policyHolderMailingAddress } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="policyHolder" policyNumber={policyNumber} />
      <div className="route-content verify">
        <div className="scroll">
          <div className="detail-wrapper">
            {/* Start Policyholders */}
            <div className="detail-group policyholder-details">
              <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholders</h3>
              <section className="display-element">
                <div className="contact-card-wrapper">
                  {policy.policyHolders &&
                     policy.policyHolders.map((policyHolder, index) => (
                       <PolicyHolderCard policyHolder={policyHolder} index={index} key={policyHolder._id} policyHolderMailingAddress={policyHolderMailingAddress} policyNumber={policyNumber} />
                     ))}
                </div>
              </section>
            </div>
            {/* End Policyholders */}
            {/* Start Agent */}
            <div className="detail-group policyholder-details">
              <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Agent</h3>
              <section className="display-element">
                <div className="contact-card-wrapper">
                  {(agents && agents.filter(a => a.agentCode === policy.agentCode).map(agent =>
                    <AgentCard agent={agent} key={agent.agentCode} />
                    ))}
                </div>
              </section>
            </div>
            {/* End Agent */}
          </div>
        </div>
      </div>
    </React.Fragment>);
};

PolicyHolder.propTypes = {
  policy: PropTypes.shape(),
  agents: PropTypes.array,
  policyNumber: PropTypes.string
};

export default PolicyHolder;
