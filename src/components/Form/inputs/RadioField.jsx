/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import reduxFormField from './reduxFormField';
import FieldHint from './FieldHint';
import RadioOption from './RadioOption';

export const RadioInput = ({
  answers,
  displayValue,
  hint,
  input,
  label,
  meta,
  segmented,
  styleName
}) => {
  const { error, warning, touched } = meta;
  const { onChange, name, value, disabled } = input;

  const formGroupStyles = classNames(
    'form-group',
    name,
    styleName,
    { segmented },
    { disabled },
  );

  const labelStyles = classNames('group-label', { 'label-segmented': segmented });

  const answerWrapperStyles = classNames('segmented-answer-wrapper', { error: touched && error });

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const DisplayField = displayValue && (<input type="text" value={displayValue} readOnly />);
  const Error = touched && (error || warning) && (<span style={{ color: 'red' }}>{error || warning}</span>);
  
  return (
    <div className={formGroupStyles} id={name} role="group">
      <label className={labelStyles} htmlFor={name}>
        {label}
        {Hint}
        {DisplayField}
      </label>
      <div className={answerWrapperStyles}>
        {answers && answers.length > 0 && answers.map((answer, index) =>
          <RadioOption
            answer={answer}
            key={index}
            size={answers.length}
            onChange={onChange}
            name={name}
            segmented={segmented}
            value={value}
          />
        )}
      </div>
      {Error}
    </div>
  );
};

RadioInput.propTypes = {
  
  // Answers used to generate tooltip
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
  
  // Used for dependent radio field, shows read only field
  displayValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  
  // Used to generate tooltip
  hint: PropTypes.string,
  
  // Input props from redux-form
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
    warning: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool
  }),
  
  // Added to class on render
  segmented: PropTypes.bool,
  styleName: PropTypes.string
};

RadioInput.defaultProps = {
  input: {},
  meta: {}
};

export default reduxFormField(RadioInput);
