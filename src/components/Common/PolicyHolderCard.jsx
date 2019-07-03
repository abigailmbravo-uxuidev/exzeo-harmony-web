import React from 'react';
import PropTypes from 'prop-types';
import normalizePhone from '../Form/normalizePhone';

const PolicyHolderCard = ({
  policyHolder,
  policyHolderMailingAddress,
  phIndex
}) => (
  <React.Fragment>
    <h3 data-test="policyholderHeader" className="section-group-header">
      <i className="fa fa-vcard-o" /> Policyholder {phIndex + 1}
    </h3>
    <section className="display-element policy-holder">
      <dl>
        <div data-test="policyholderName">
          <dt>Policyholder Name</dt>
          <dd>
            {policyHolder.firstName} {policyHolder.lastName}
          </dd>
        </div>
        <div data-test="policyholderPhone">
          <dt>Phone</dt>
          <dd>{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
        </div>
        {policyHolder.secondaryPhoneNumber && (
          <div data-test="policyholderPhone2">
            <dt>Phone</dt>
            <dd>{normalizePhone(policyHolder.secondaryPhoneNumber)}</dd>
          </div>
        )}
        <div data-test="policyholderEmail">
          <dt>Email</dt>
          <dd>{policyHolder.emailAddress}</dd>
        </div>
      </dl>
      {phIndex === 0 && (
        <dl>
          <div data-test="policyHolderMailingAddress">
            <dt>Mailing Address</dt>
            <dd>{`${policyHolderMailingAddress.address1} ${
              policyHolderMailingAddress.address2
                ? policyHolderMailingAddress.address2
                : ''
            }
            ${policyHolderMailingAddress.city}, ${
              policyHolderMailingAddress.state
            } ${policyHolderMailingAddress.zip}`}</dd>
          </div>
        </dl>
      )}
    </section>
  </React.Fragment>
);

PolicyHolderCard.propTypes = {
  policyHolderMailingAddress: PropTypes.shape(),
  policyHolder: PropTypes.shape(),
  phIndex: PropTypes.number
};

export default PolicyHolderCard;
