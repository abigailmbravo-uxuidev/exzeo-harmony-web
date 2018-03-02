import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MaskedTextInput from 'react-text-mask';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';
import { combineRules } from '../Rules';

export const PhoneInput = ({
  input,
  hint,
  label,
  styleName,
  meta,
  type,
  disabled,
  validations,
  name,
  dependsOn
}) => {
  const { touched, error, warning } = meta;

  const ruleArray = combineRules(validations, { dependsOn });

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { disabled },
    { valid: touched && !error },
    { error: touched && error }
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const Label = label && (<label htmlFor={name}>
    {label}
    {Hint}
  </label>);

  return (
    <div className={formGroupStyles} id={name}>
      {Label}
      <MaskedTextInput
        tabIndex={'0'}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={false}
        id={name}
        name={name}
        component="input"
        type="text"
        placeholder="(555) 555-5555"
        validate={ruleArray}
        {...input}
      />
      {Error}
    </div>
  );
};

PhoneInput.propTypes = {

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
    value: PropTypes.any
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
    warning: PropTypes.string
  }),

  /**
   * Answer Type from original question
   */
  type: PropTypes.oneOf([
    'email',
    'password',
    'text',
    'number',
    'date',
    'tel',
    'search'
  ]),

  /**
   * Stylename for form-group
   */
  styleName: PropTypes.string

};

PhoneInput.defaultProps = {
  hint: '',
  input: {},
  meta: {},
  type: 'text',
  styleName: ''
};

export default reduxFormField(PhoneInput);
