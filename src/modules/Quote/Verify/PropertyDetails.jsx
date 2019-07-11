import React from 'react';
import { date } from '@exzeo/core-ui';

export const PropertyDetails = ({
  quoteNumber,
  effectiveDate,
  property,
  selectedAgent
}) => {
  return (
    <section className="display-element">
      <dl className="quote-number">
        <div>
          <dt>Quote Number</dt>
          <dd>{quoteNumber}</dd>
        </div>
      </dl>
      <dl className="property-information">
        <div>
          <dt>Property Address</dt>
          <dd>{property.physicalAddress.address1}</dd>
          <dd>{property.physicalAddress.address2}</dd>
          <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${property.physicalAddress.zip}`}</dd>
        </div>
      </dl>
      <dl className="property-information">
        <div>
          <dt>Year Built</dt>
          <dd>{property.yearBuilt}</dd>
        </div>
      </dl>
      <dl className="effective-date">
        <div>
          <dt>Effective Date</dt>
          <dd>{date.formatDate(effectiveDate)}</dd>
        </div>
      </dl>
      <dl className="agent">
        <div>
          <dt>Agent</dt>
          <dd>{`${selectedAgent.label}`}</dd>
        </div>
      </dl>
    </section>
  );
};

PropertyDetails.defaultProps = {
  selectedAgent: {},
  property: {
    physicalAddress: {}
  }
};
export default PropertyDetails;
