import React from 'react';
import _get from 'lodash/get';
import { format } from '@exzeo/core-ui';

const { toCurrency, boolToYesNo, toPercent } = format;

function formatDetailValue(detail, value) {
  const { format } = detail;

  if (format === 'currency') {
    return toCurrency(value);
  } else if (format === 'bool') {
    return boolToYesNo(value);
  } else if (format === 'percent') {
    return toPercent(value);
  }
  return value;
}

// TODO: Move to core-ui eventually
export const QuoteDetails = ({ details, formValues }) => {
  function getValue(detail) {
    return _get(formValues, detail.path, '');
  }

  return (
    <section className="display-element">
      {details.map(detail => {
        const value = getValue(detail);
        if (!value && detail.hideNoValue) return null;
        return (
          <dl key={detail.label}>
            <div>
              <dt>{detail.label}</dt>
              <dd>{formatDetailValue(detail, value)}</dd>
            </div>
          </dl>
        );
      })}
    </section>);
};

QuoteDetails.defaultProps = {
  details: []
};

export default QuoteDetails;
