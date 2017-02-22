import React, { PropTypes } from 'react';
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
}) => {
  const { touched, error, warning } = meta;
  const { disabled, name } = input;

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { disabled },
    { valid: touched && !error },
    { error: touched && error },
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const Error = touched && (error || warning) && (
    <span style={{ color: 'red' }}>{error || warning}</span>
  );

  return (
    <div className={formGroupStyles}>
      <label htmlFor={classNames(name)}>
        {label}
        &nbsp;
        {Hint}
      </label>
      <input
        {...input}
        onChange={input.onChange}
        type={type}
      />
      {Error}
    </div>
  );
};

TextInput.propTypes = {

  /**
   * Hint for the user
   */
  hint: PropTypes.string,

  /**
   * Input from redux-field Field component
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }),

  /**
   * Label to display above question
   */
  label: PropTypes.string,

  /**
   * Validations props
   */
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string,
  }),

  /**
   * Answer Type from original question
   */
  type: PropTypes.string,

  /**
   * Stylename for form-group
   */
  styleName: PropTypes.string,

};

export default reduxFormField(TextInput);
