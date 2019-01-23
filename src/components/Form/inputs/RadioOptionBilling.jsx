import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const RadioOptionBilling = ({
  onChange,
  answer,
  name,
  segmented,
  size,
  value,
}) => (
  <div className={classNames(`radio-column-${size}`, { selected: value === answer })} onClick={() => onChange(answer)} >
    <label className={classNames({'label-segmented': segmented, selected: value === answer })} htmlFor={name}>
      <input
        onChange={() => onChange(answer)}
        name={name}
        type="radio"
        checked={String(value) === String(answer)}
        value={answer}
      />
      <span>{answer}</span>
    </label>
  </div>
);

RadioOptionBilling.propTypes = {
  paymentPlan : PropTypes.any, // eslint-disable-line
  answer: PropTypes.shape({
    answer: PropTypes.string
  }),
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  segmented: PropTypes.bool,
  value: PropTypes.any, // eslint-disable-line
};

export default RadioOptionBilling;
