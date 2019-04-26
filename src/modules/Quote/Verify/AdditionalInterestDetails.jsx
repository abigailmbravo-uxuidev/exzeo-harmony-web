import React from 'react';
import classNames from 'classnames';

function handlePrimarySecondaryTitles(type, order) {
  return `${type} ${order + 1}`;
}

export const AdditionalInterestDetails = ({ additionalInterests }) => {
  return (
    <section className="display-element additional-interests">
      {additionalInterests.map((additionalInterest) =>
        <div className="card" key={additionalInterest._id}>
          <div className="icon-wrapper">
            <i className={classNames('fa', additionalInterest.type)}/>
            <p>{handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
          </div>
          <section>
            <h4>{`${additionalInterest.name1}`}</h4>
            <h4>{`${additionalInterest.name2}`}</h4>
            <p>
              {`${additionalInterest.mailingAddress.address1}`}
              {additionalInterest.mailingAddress.address2 ? `, ${additionalInterest.mailingAddress.address2}` : ''}
            </p>
            <p>
              {`${additionalInterest.mailingAddress.city}, `}
              {`${additionalInterest.mailingAddress.state} `}
              {`${additionalInterest.mailingAddress.zip}`}
            </p>
          </section>
          <div className="ref-number">
            <label htmlFor="ref-number">Reference Number</label>
            <span>{`${additionalInterest.referenceNumber}`}</span>
          </div>
        </div>
      )}
    </section>
  );
};

AdditionalInterestDetails.defaultProps = {
  additionalInterests: []
};
export default AdditionalInterestDetails;
