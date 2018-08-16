import React from 'react';
import PropTypes from 'prop-types';
import normalizePhone from '../Form/normalizePhone';

const PolicyHolderCard = ({ policyHolder, policyHolderMailingAddress, phIndex
}) => (
  <React.Fragment>
    <h3 data-test-="policyholderHeader" className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder {phIndex + 1}</h3>
    <section className="display-element policy-holder">
      <dl>
        <div data-test-="policyholderName">
          <dt className="policyholderName">Policyholder Name</dt>
          <dd className="policyholderName">{policyHolder.firstName} {policyHolder.lastName}</dd>
        </div>
        <div data-test-="policyholderPhone" >
          <dt className="policyholderPhone">Phone</dt>
          <dd className="policyholderPhone">{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
        </div>
        { policyHolder.secondaryPhoneNumber &&
        <div data-test-="policyholderPhone2">
          <dt className="policyholderPhone">Phone</dt>
          <dd className="policyholderPhone">{normalizePhone(policyHolder.secondaryPhoneNumber)}</dd>
        </div>
   }
        <div data-test-="policyholderEmail">
          <dt className="policyholderEmail">Email</dt>
          <dd className="policyholderEmail">{policyHolder.emailAddress}</dd>
        </div>
      </dl>
      {phIndex === 0 &&
      <dl>
        <div data-test-="policyHolderMailingAddress">
          <dt className="policyHolderMailingAddress">Mailing Address</dt>
          <dd className="policyHolderMailingAddress">{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
            ${policyHolderMailingAddress.city}, ${policyHolderMailingAddress.state} ${policyHolderMailingAddress.zip}`}</dd>
        </div>
      </dl>
 }
    </section>
  </React.Fragment>
);


PolicyHolderCard.propTypes = {
  policyHolderMailingAddress: PropTypes.shape(),
  policyHolder: PropTypes.shape(),
  phIndex: PropTypes.number
};

export default PolicyHolderCard;
