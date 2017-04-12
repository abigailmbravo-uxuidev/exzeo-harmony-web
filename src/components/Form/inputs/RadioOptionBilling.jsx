import React, { PropTypes } from 'react';
import classNames from 'classnames';

const RadioOptionBilling = ({
  paymentPlan,
  onChange,
  answer,
  name,
  segmented,
  size,
  value,
  input
}) => (
  <div
    className={classNames(
        `radio-column-${size}`,
        { selected: value === answer }
    )}
    onClick={() => onChange(answer)}
  >
    <label
      className={classNames(
      'label-segmented': segmented,
      { selected: value === answer },
    )} htmlFor={name}
    >
      <input
        onChange={() => onChange(answer)}
        name={name}
        type="radio"
        checked={String(value) === String(answer)}
        value={answer}
      />
      <span>{answer}</span>

      {/* {paymentPlan && paymentPlan.amount && <span>
        {paymentPlan.amount}
      </span>}
      {paymentPlan && paymentPlan.s1 && paymentPlan.s2 && <span>
        {paymentPlan.s1.amount} : {paymentPlan.s1.dueDate}
        {paymentPlan.s2.amount} : {paymentPlan.s2.dueDate}
      </span>}
      {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 && <span>
        {paymentPlan.q1.amount} : {paymentPlan.q1.dueDate}
        {paymentPlan.q2.amount} : {paymentPlan.q2.dueDate}
        {paymentPlan.q3.amount} : {paymentPlan.q3.dueDate}
        {paymentPlan.q4.amount} : {paymentPlan.q4.dueDate}
      </span>} */}
    </label>
  </div>
);

RadioOptionBilling.propTypes = {
  paymentPlan : PropTypes.any, // eslint-disable-line
  /**
   * Answer used to generate option
   */
  answer: PropTypes.string,

  /**
   * Name for option
   */
  name: PropTypes.string,

  /**
   * Change handler from parent
   */
  onChange: PropTypes.func.isRequired,

  /**
   * Number of answers, for styling
   */
  size: PropTypes.number,

  /**
   * Whether to use segmented slides
   */
  segmented: PropTypes.bool,

  /**
   * Used to find if options is selected
   */
  value: PropTypes.any, // eslint-disable-line
};

export default RadioOptionBilling;
