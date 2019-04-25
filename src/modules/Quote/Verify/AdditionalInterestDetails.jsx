
import React from 'react';

export const AdditionalInterestDetails = ({ additionalInterests }) => {
  function handlePrimarySecondaryTitles(type, order){ 
    return `${type} ${order + 1}`; 
  };

  return (
    <section className="display-element additional-interests">
    {additionalInterests.map((additionalInterest, index) => (String(additionalInterest.name1).trim().length > 0 &&
      <div className="card" key={`ph${index}`}>
        <div className="icon-wrapper">
          <i className={`fa ${additionalInterest.type}`} />
          <p>{handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
        </div>
        <section>
          <h4>{`${additionalInterest.name1}`}</h4>
          <h4>{`${additionalInterest.name2}`}</h4>
          <p>
            {`${additionalInterest.policyHolderMailingAddress.address1}`}
            {additionalInterest.policyHolderMailingAddress.address2 ? `, ${additionalInterest.policyHolderMailingAddress.address2}` : ''}
          </p>
          <p>
            {`${additionalInterest.policyHolderMailingAddress.city}, `}
            {`${additionalInterest.policyHolderMailingAddress.state} `}
            {`${additionalInterest.policyHolderMailingAddress.zip}`}
          </p>
        </section>
        <div className="ref-number">
          <label htmlFor="ref-number">Reference Number</label>
          <span>{`${additionalInterest.referenceNumber}`}</span>
        </div>
      </div>
    ))}
  </section>);
};

AdditionalInterestDetails.defaultProps = {
  additionalInterests: []
}
export default AdditionalInterestDetails;
