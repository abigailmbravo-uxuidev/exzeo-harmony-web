import React from 'react';
import PropTypes from 'prop-types';
import platform from 'platform';
import moment from 'moment';
import classNames from 'classnames';
import MaskedTextInput from 'react-text-mask';
import FieldHint from './FieldHint';
import { combineRules } from '../Rules';
import reduxFormField from './reduxFormField';

export const DateInput = ({
  input,
  hint,
  label,
  styleName,
  validations,
  meta,
  min,
  max,
  type }) => {
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

  const ruleArray = combineRules(validations, { });

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const formattedDate = input.value ? moment(input.value).format('YYYY-MM-DD') : undefined;
  const formatMinDate = moment(min).format('MM/DD/YYYY');
  const formatMaxDate = moment(max).format('MM/DD/YYYY');
  const platformLower = platform.name ? platform.name.toLowerCase() : '';

  const Label = label && (<label className="date-label-wrapper" htmlFor={name} data-test={`${name}_label`}>
    {label}
    {formatMaxDate && formatMinDate ? <div className="date-min-max">{formatMinDate} - {formatMaxDate}</div> : null}
    {Hint}
  </label>);

  return (
    <div className={formGroupStyles} id={name} data-test={name}>
      {Label}
      {platformLower === 'safari' ||
       platformLower === 'firefox' ||
       platformLower === 'ie' ?
         <MaskedTextInput
          tabIndex={'0'}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          guide={false}
          id={name}
          name={name}
          component="input"
          type="text"
          placeholder="MM/DD/YYYY"
          validate={ruleArray}
          {...input}
          data-test={`${name}_input`}
        /> :
           <input
          tabIndex={'0'}
          type={'date'}
          {...input}
          value={formattedDate}
          data-test={`${name}_input`}
        />}
      {Error}
    </div>
  );
};

DateInput.propTypes = {
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

DateInput.defaultProps = {
  input: {},
  meta: {},
  type: 'text'
};

export default reduxFormField(DateInput);
