import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const TextInput = ({
  input,
  hint,
  label,
  styleName,
  meta,
  type,
  autoFocus,
  readOnly,
  dependsOn
}) => {
  const { touched, error, warning } = meta;
  const { disabled, name } = input;

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { disabled },
    { valid: touched && !error },
    { error: touched && error }
  );

  const Hint = hint && <FieldHint name={name} hint={hint} />;

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const Label = label && (
    <label htmlFor={name}>
      {label}
      {Hint}
    </label>
  );

  return (
    <div className={formGroupStyles} id={name} data-test={name}>
      {Label}
      <input
        readOnly={readOnly}
        autoFocus={autoFocus}
        tabIndex={'0'}
        {...input}
        type={type}
      />
      {Error}
    </div>
  );
};

TextInput.propTypes = {
  // Used for tooltip
  hint: PropTypes.string,

  // Input Props provided by redux-form
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string
    ])
  }),

  // Label for input
  label: PropTypes.string,

  // Validations
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string
  }),

  // Type for input
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
    'number',
    'date',
    'tel',
    'search'
  ]),

  // Name to add to class on render
  styleName: PropTypes.string
};

TextInput.defaultProps = {
  input: {},
  meta: {},
  type: 'text'
};

export default reduxFormField(TextInput);
