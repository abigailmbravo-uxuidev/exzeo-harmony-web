import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInput = ({
  answers,
  hint,
  input,
  label,
  meta,
  styleName,
  autoFocus
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;

  const formGroupStyles = classNames('form-group select',
    styleName,
    name,
    { valid: touched && !error },
    { error: touched && error }
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const Error = touched && (error || warning) && <span style={{ color: 'red' }}>{error || warning}</span>;

  return (
    <div className={`${formGroupStyles} ${value}`} id={name} data-test={name}>
      <label htmlFor={name}>
        {label}
        {Hint}
      </label>
      {answers && answers.length > 0 ? (
        <select
          tabIndex={'0'}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          aria-activedescendant={value}
        >
          <option aria-label={'Please select...'} disabled value={''}>Please select...</option>
          {answers.map((answer, index) => (
            <option
              aria-label={answer.label || answer.answer}
              value={answer.answer} key={index}
            >
              {answer.label || answer.answer}
            </option>
          ))}
        </select>
      ) : null}
      { Error }
    </div>
  );
};

SelectInput.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string
  })),
  hint: PropTypes.string,
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
  }),
  label: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }),
  styleName: PropTypes.string
};

SelectInput.defaultProps = {
  input: {
    onChange: () => {}
  },
  meta: {}
};

export default reduxFormField(SelectInput);
