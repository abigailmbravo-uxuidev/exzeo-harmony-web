import React from 'react';
import PropTypes from 'prop-types';
import PolicyTabs from '../Common/PolicyTabs';
import normalizePhone from '../Form/normalizePhone';

export const PolicyHolder = ({ policy, policyNumber, agents }) => {
  const { policyHolderMailingAddress } = policy;
  return (
    <React.Fragment>
      <PolicyTabs activeTab="policyHolder" policyNumber={policyNumber} />
      <div className="route-content verify">
          {/* Start Policyholders */}
          <div className="detail-group policyholder-details">
            {policy.policyHolders &&
               policy.policyHolders.map((policyHolder, index) => (
                 <React.Fragment>
                 <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder {index + 1}</h3>
                 <section className="display-element policy-holder">
                  <dl>
                    <div>
                      <dt className="policyholderName">Policyholder Name</dt>
                      <dd className="policyholderName">{policyHolder.firstName} {policyHolder.lastName}</dd>
                    </div>
                    <div>
                      <dt className="policyholderPhone">Phone</dt>
                      <dd className="policyholderPhone">{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
                    </div>
                    { policyHolder.secondaryPhoneNumber &&
                      <div>
                        <dt className="policyholderPhone">Phone</dt>
                        <dd className="policyholderPhone">{normalizePhone(policyHolder.secondaryPhoneNumber)}</dd>
                      </div>
                    }
                    <div>
                      <dt className="policyholderEmail">Email</dt>
                      <dd className="policyholderEmail">{policyHolder.emailAddress}</dd>
                    </div>
                  </dl>
                  { index==0 &&
                  <dl>
                    <div>
                      <dt className="policyHolderMailingAddress">Mailing Address</dt>
                      <dd className="policyHolderMailingAddress">{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
                ${policyHolderMailingAddress.city}, ${policyHolderMailingAddress.state} ${policyHolderMailingAddress.zip}`}</dd>
                    </div>
                  </dl>
                  }
                </section>
                </React.Fragment>
              ))}
          </div>
          {/* End Policyholders */}
      </div>
    </React.Fragment>);
};

PolicyHolder.propTypes = {
  policy: PropTypes.shape(),
  agents: PropTypes.array,
  policyNumber: PropTypes.string
};

export default PolicyHolder;
