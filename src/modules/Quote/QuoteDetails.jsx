
import React from 'react';
import _get from 'lodash/get';
import { toCurrency, boolToYesNo } from '@exzeo/core-ui/src/InputLifecycle';

export const QuoteDetails = ({ details, formValues }) => {

  function formatDetailValue(detail, value) {
    const { format } = detail;

    if(format === 'currency') {
      return toCurrency(value);
    }
    else if (format === 'bool') {
      return boolToYesNo(value)
    }
    return value;
  };

  function getValue(detail){
    const { path } = detail;
    return _get(formValues,path, '');
  }

  return (
  <section className="display-element">
    {details.map(detail => {
      const value = getValue(detail);
      if(!value && detail.hideNoValue) return null;
      return (
      <dl>
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
}

export default QuoteDetails;
