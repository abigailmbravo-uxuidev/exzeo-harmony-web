import React from 'react';
import { date } from '@exzeo/core-ui';
import { Link } from 'react-router-dom';
import { PRODUCT_DISPLAY_NAMES } from '../../../constants/companyStateProduct';

const PolicyCard = ({ policy = {} }) => {
  const {
    policyID,
    policyNumber,
    product,
    policyHolders,
    property,
    status,
    effectiveDate
  } = policy;
  const phDisplayName = `${policyHolders[0]?.firstName ?? ''} ${policyHolders[0]
    ?.lastName ?? ''}`;

  return (
    <li id={policyID} className="card">
      <Link to={`/policy/${policyNumber}/policyHolder`}>
        <div className="icon">
          <i className="card-icon fa fa-user-circle" />
          <span>{PRODUCT_DISPLAY_NAMES[product]}</span>
        </div>
        <section>
          <span className="policy-no">{policyNumber}</span>
          <h4 className="name" title={phDisplayName}>
            <i className="fa fa-chevron-circle-right" />
            {phDisplayName}
          </h4>

          <span className="property-address">
            {`${property.physicalAddress.address1} ${property.physicalAddress.city}, ${property.physicalAddress.state} ${property.physicalAddress.zip}`}
          </span>
          <div className="policy card-detail-wrapper">
            <span className="policy-status">{status}</span>
            <div className="sub-detail-wrapper">
              <span className="effective-date">
                <label>Effective</label>
                {date.formatDate(effectiveDate)}
              </span>
            </div>
          </div>
        </section>
      </Link>
    </li>
  );
};

export default PolicyCard;
