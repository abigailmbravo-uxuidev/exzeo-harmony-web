import React from 'react';
import normalizePhone from '../Form/normalizePhone';

const PolicySearchCard = ({ policyHolder, policyHolderMailingAddress, index, policyNumber, id
}) => (
  <div key={`ph${id}`} className="primary-policyholder contact card">
    <div className="contact-title"><i className="fa fa-address-card-o" /><label>Policyholder {index + 1}</label></div>
    <div className="contact-details">
      <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
      <div className="contact-address">{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
${policyHolderMailingAddress.city}, ${policyHolderMailingAddress.state} ${policyHolderMailingAddress.zip}`}</div>
      <div className="additional-contacts">
        <ul>
          <li>
            <div className="contact-methods">
              <p className="primary-phone">
                <i className="fa fa-phone-square" />
                <a href={`tel: ${(policyHolder.primaryPhoneNumber)}`}>{normalizePhone(policyHolder.primaryPhoneNumber)}</a>
              </p>
              { policyHolder.secondaryPhoneNumber && <p className="secondary-phone">
                <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                <a href={`tel: ${policyHolder.secondaryPhoneNumber}`}>{normalizePhone(policyHolder.secondaryPhoneNumber)}</a>
              </p> }
              <p className="email">
                <i className="fa fa-envelope" />
                <a href={`mailto: ${policyHolder.emailAddress}?subject=${policyNumber}%20${policyHolder.firstName}%20${policyHolder.lastName}`}>{policyHolder.emailAddress}</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="electronic-delivery"><label>Electronic Delivery: </label> {policyHolder.electronicDelivery ? 'Yes' : 'No'}</div>
  </div>
);

export default PolicySearchCard;
