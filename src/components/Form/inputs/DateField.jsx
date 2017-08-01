import React, { PropTypes } from 'react';
import platform from 'platform';
import moment from 'moment';
import classNames from 'classnames';
import { Field } from 'redux-form';
import normalizeDate from '../normalizeDate';
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
  type
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

  const ruleArray = combineRules(validations, { min, max });

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const Error = touched && (error || warning) && (
    <span>{error || warning}</span>
  );

  const Label = label && (<label htmlFor={name}>
    {label} &nbsp; {Hint}
  </label>);

  const onDateChange = (event) => {
    if (!touched) event.target.value = '';
  };

  return (
    <div className={formGroupStyles} id={name}>
      {Label}
      { (platform.os.toString().includes('ios') || platform.os.toString().includes('android')) && <input
        {...input}
        type={'date'}
        min={min ? moment.utc(min).format('YYYY-MM-DD') : null}
        max={min ? moment.utc(max).format('YYYY-MM-DD') : null}
      />}
      { !platform.os.toString().includes('ios') && !platform.os.toString().includes('android') &&
        <Field
          // onFocus={onDateChange}
          name={name}
          component="input"
          type="text"
          placeholder="MM/DD/YYYY"
          normalize={normalizeDate}
          validate={ruleArray}
          {...input}
        />
      }
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
