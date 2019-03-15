/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reduxFormField from './reduxFormField';
import FieldHint from './FieldHint';
import RadioOptionBilling from './RadioOptionBilling';

export const RadioInputBilling = ({
  paymentPlans,
  answers,
  displayValue,
  hint,
  input,
  label,
  meta,
  segmented,
  styleName
}) => {
  const { error, touched } = meta;
  const { onChange, name, value, disabled } = input;

  const formGroupStyles = classNames(
    'form-group',
    { segmented },
    { name },
    { styleName },
    { disabled },
  );

  const labelStyles = classNames('group-label', { 'label-segmented': segmented });

  const answerWrapperStyles = classNames('segmented-answer-wrapper', { error: touched && error });

  const Hint = hint && (<FieldHint name={name} hint={hint} />);

  const DisplayField = displayValue && (<input type="text" value={displayValue} readOnly />);

  const getSelectedPlan = (answer) => {
    let selection;

    if (answer === 'Annual') {
      selection = 'annual';
    } else if (answer === 'Semi-Annual') {
      selection = 'semiAnnual';
    } else if (answer === 'Quarterly') {
      selection = 'quarterly';
    }

    return selection;
  };

  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };


  return (
    <div className={formGroupStyles} role="group" data-test={name}>
      <label className={labelStyles} htmlFor={name}>
        {label}
        {Hint}
        {DisplayField}
      </label>
      <div className={answerWrapperStyles}>
        {answers && answers.length > 0 && answers.map((answer, index) =>
          <RadioOptionBilling
            input={input}
            paymentPlan={paymentPlans[getSelectedPlan(answer)]}
            answer={answer}
            key={index}
            tabIndex={'0'}
            size={answers.length}
            onChange={onChange}
            onKeyPress={onKeyPress}
            name={name}
            segmented={segmented}
            value={value}
          />
        )}
      </div>
    </div>
  );
};

RadioInputBilling.propTypes = {
paymentPlans: PropTypes.any,
  answers: PropTypes.any,
  displayValue: PropTypes.any,
  hint: PropTypes.string,
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  }),
  label: PropTypes.string,
  meta: PropTypes.shape({
    warning: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool
  }),
  segmented: PropTypes.bool,
  styleName: PropTypes.string
};

RadioInputBilling.defaultProps = {
  input: {},
  meta: {}
};

export default reduxFormField(RadioInputBilling);
