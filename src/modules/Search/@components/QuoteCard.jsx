import React from 'react';
import { date, format } from '@exzeo/core-ui';
import { PRODUCT_DISPLAY_NAMES } from '../../../constants/companyStateProduct';

const QuoteCard = ({ quote, handleClick }) => {
  const {
    _id,
    product,
    quoteNumber,
    property,
    policyHolders,
    quoteState,
    effectiveDate,
    createdAt,
    rating
  } = quote;
  const phDisplayName = `${policyHolders[0]?.firstName ?? ''} ${policyHolders[0]
    ?.lastName ?? ''}`;
  return (
    <li
      id={_id}
      className="card"
      tabIndex="0"
      onKeyPress={e => e.charCode === 13 && handleClick(quote)}
      onClick={() => handleClick(quote)}
    >
      <div className="icon">
        <i className="card-icon fa fa-user-circle" />
        <span>{PRODUCT_DISPLAY_NAMES[product]}</span>
      </div>
      <section>
        <span className="quote-no">{quoteNumber}</span>
        <h4 className="name" title={phDisplayName}>
          <i className="fa fa-chevron-circle-right" />
          {phDisplayName}
        </h4>
        <span className="property-address">
          {`${property.physicalAddress.address1} ${property.physicalAddress.city}, ${property.physicalAddress.state} ${property.physicalAddress.zip}`}
        </span>

        <div className="quote card-detail-wrapper">
          <span className="quote-state" data-test="quote-state">
            {quoteState}
          </span>
          <div className="sub-detail-wrapper">
            <span
              className="effective-date"
              aria-labelledby="effective-date-label"
            >
              <label id="effective-date-label">Effective</label>
              {date.formatDate(effectiveDate)}
            </span>
            <span className="started-on" aria-labelledby="started-date-label">
              <label id="started-date-label">Started</label>
              {date.formattedLocalDate(createdAt, 'MM/DD/YYYY')}
            </span>
            <span className="premium">
              <strong>
                {(rating && format.toCurrency(rating.totalPremium)) || '$ -'}
              </strong>
            </span>
          </div>
        </div>
      </section>
    </li>
  );
};

export default QuoteCard;
