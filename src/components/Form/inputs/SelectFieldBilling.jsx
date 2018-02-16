import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectFieldBilling = ({
  answers,
  hint,
  input,
  label,
  styleName
}) => {
  const { onChange, name, value, disabled } = input;

  const formGroupStyles = classNames('form-group select', { styleName }, { name });
  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const selectedOption = answers.find(b => b.billToId === value);
  return (
    <div className={formGroupStyles}>
      <label htmlFor={name}>
        {label}
        {Hint}
        {answers && answers.length > 0 ? (
          <select
            tabIndex={'0'}
            value={value}
            name={name}
            disabled={disabled}
            onChange={onChange}
            aria-valuetext={selectedOption ? selectedOption.displayText : ''}
          >
            <option aria-label={'Please select...'} disabled value={''}>Please select...</option>
            {answers.map((answer, index) => (
              <option aria-label={answer.displayText} value={answer.billToId} key={index}>
                {answer.displayText}
              </option>
            ))}
          </select>
        ) : null}
      </label>
    </div>
  );
};

SelectFieldBilling.propTypes = {

  /**
   * Answers array used to generate options
   */
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.any, // eslint-disable-line
    label: PropTypes.string,
    image: PropTypes.string
  })),

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,

  /**
   * Input provided by redux-form field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
  }),

  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectFieldBilling.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectFieldBilling);
