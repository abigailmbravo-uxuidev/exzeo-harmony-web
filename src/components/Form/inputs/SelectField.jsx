import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInput = ({
  answers,
  hint,
  input,
  label,
  meta,
  styleName
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;

  const formGroupStyles = classNames(
    'form-group',
    styleName,
    name,
    { valid: touched && !error },
    { error: touched && error }
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const Error = touched && (error || warning) && <span style={{ color: 'red' }}>{error || warning}</span>;

  return (
    <div className={formGroupStyles} id={name}>
      <label htmlFor={name}>
        {label} &nbsp; {Hint}
        {answers && answers.length > 0 ? (
          <select
            value={value}
            name={name}
            disabled={disabled}
            onChange={onChange}
          >
            <option disabled value={''}>Please select...</option>
            {answers.map((answer, index) => (
              <option value={answer.answer} key={index}>
                {answer.label || answer.answer}
              </option>
            ))}
          </select>
        ) : null}
      </label>
      { Error }
    </div>
  );
};

SelectInput.propTypes = {

  // Answers used to generate options
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string
    ]),
    label: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    image: PropTypes.string
  })),

  // Used to generate tooltip
  hint: PropTypes.string,

  // Input props provided by redux-form
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

  // Label for field
  label: PropTypes.string,

  // Validations
  meta: {
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  },

  // Name added to class on render
  styleName: PropTypes.string
};

SelectInput.defaultProps = {
  input: {
    onChange: () => {}
  },
  meta: {}
};

export default reduxFormField(SelectInput);
