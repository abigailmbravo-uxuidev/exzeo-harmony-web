import React, { PropTypes } from 'react';
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

  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label}
         &nbsp;
        {Hint}
      </label>
      <div className="range-wrapper">
        <div className="range-control-wrapper">
          <span className="range-limit">{leftLabel || min || '0'}</span>
          <input
            type="range"
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={input.onChange}
          />
          <span className="range-limit">{rightLabel || max}</span>
        </div>
        <span className="range-value">
          <input
            autoFocus={autoFocus}
            tabIndex={'0'}
            type="text"
            value={`$ ${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
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
