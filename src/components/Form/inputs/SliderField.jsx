import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SliderInput = ({
  hint,
  input,
  label,
  leftLabel,
  max,
  min,
  meta,
  rightLabel,
  step,
  styleName,
  autoFocus
}) => {
  const { name, value } = input;
  const { error } = meta;

  const formGroupStyles = classNames(
    'form-group',
    'range-component',
    styleName,
    name,
    { valid: !error },
    { error }
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const Error = error && (
    <span style={{ color: 'red' }}>{error}</span>
  );

  const handleChange = function (event) {
    const val = Number(event.target.value.replace(/\D+/g, ''));
    if (!Number.isNaN(val)) { input.onChange(val); }
  };

  const calculatedValue = Number(Math.round(value / 1000) * 1000);

  return (
    <div className={formGroupStyles} data-test={name}>
      <label htmlFor={name}>
        {label}
        {Hint}
      </label>
      <div className="range-wrapper">
        <div className="range-control-wrapper" data-test={`${name}-slider-wrapper`}>
          <span className="range-limit">{leftLabel || min || '0'}</span>
          <input
            autoFocus={autoFocus}
            tabIndex={'0'}
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            value={calculatedValue}
            onChange={input.onChange}
            data-test={`${name}-slider`}
          />
          <span className="range-limit">{rightLabel || max}</span>
        </div>
        <span className="range-value">
          <input
            tabIndex={'0'}
            type="text"
            value={`$ ${calculatedValue >= 100000 ? calculatedValue.toLocaleString() : Number(value).toLocaleString()}`}
            onChange={handleChange}
            name={name}
          />
        </span>
      </div>
      { Error }
    </div>
  );
};

SliderInput.propTypes = {
  // Used to generate tooltip
  hint: PropTypes.string,

  // Input props provided by redux-form
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  }),

  // Label for input
  label: PropTypes.string,

  // Label for left of slider
  leftLabel: PropTypes.string,

  // Max and min limit for range slider
  max: PropTypes.number,
  min: PropTypes.number,

  // Validations
  meta: PropTypes.shape({
    error: PropTypes.string
  }),

  // Label for right of slider
  rightLabel: PropTypes.string,

  // Step for slider input
  step: PropTypes.number,

  // Name added to class on render
  styleName: PropTypes.string

};

SliderInput.defaultProps = {
  input: {}
};

export default reduxFormField(SliderInput);
