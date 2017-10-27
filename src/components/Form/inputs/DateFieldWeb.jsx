import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import configure from 'react-widgets/lib/configure';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import 'react-widgets/dist/css/react-widgets.css';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import { combineRules } from '../Rules';
import reduxFormField from './reduxFormField';
import normalizeDate from '../normalizeDate';

configure.setDateLocalizer(momentLocalizer(moment));

export const DateWebInput = ({
  input,
  hint,
  label,
  styleName,
  validations,
  meta,
  min,
  max
}) => {
  const { touched, error, warning } = meta;
  const { disabled, name } = input;

  const ruleArray = combineRules(validations, { min, max });

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
      {label} &nbsp; {Hint}
    </label>);

  const minDate = new Date(moment(min).format('MM/DD/YYYY'));
  const maxDate = new Date(moment(max).format('MM/DD/YYYY'));
  return (
    <div className={formGroupStyles} id={name}>
      {Label}
      <DateTimePicker
        tabIndex={'0'}

        normalize={normalizeDate}
        min={minDate}
        max={maxDate}
        name={name}
        {...input}
        format="MM/DD/YYYY"
        time={false}
        value={!input.value ? null : new Date(moment(input.value).format('MM/DD/YYYY'))}
      />
      {Error}
    </div>
  );
};

DateWebInput.propTypes = {
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

DateWebInput.defaultProps = {
  input: {},
  meta: {},
  type: 'text'
};


export default reduxFormField(DateWebInput);
