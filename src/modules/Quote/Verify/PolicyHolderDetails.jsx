
import React from 'react';
import { normalize } from '@exzeo/core-ui';
const { phone } = normalize;

export const PolicyHolderDetails = ({ policyHolders }) => {
  return (
    <section className="display-element">
    <p>Please be sure the information below is up to date and accurate. The final application will be sent to the e-mail addresses of the policyholder(s) provided, to obtain their
      electronic signature required to bind the policy. Policyholder contact information will also be used to schedule the required property inspection. Failure to schedule property
      inspection will results in failure to bind the policy.</p>
    <div className="contact-card-wrapper">
      {policyHolders.map((policyHolder, index) => (String(policyHolder.firstName).trim().length > 0 &&
        <div className="contact-card" key={`ph${index}`}>
          <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
          <dl>
            <div className="contact-name">
              <dt>Name</dt>
              <dd>{`${policyHolder.firstName || ''} ${policyHolder.lastName || ''}`}</dd>
            </div>
            <div className="contact-phone">
              <dt>Phone Number</dt>
              <dd>{phone(policyHolder.primaryPhoneNumber)}</dd>
            </div>
            <div className="contact-email">
              <dt>Email</dt>
              <dd>{policyHolder.emailAddress}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  </section>);
};

PolicyHolderDetails.defaultProps = {
  policyHolders: []
}
export default PolicyHolderDetails;
