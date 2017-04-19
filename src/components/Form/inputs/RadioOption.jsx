import React, { PropTypes } from 'react';
import classNames from 'classnames';

const RadioOption = ({
  onChange,
  answer,
  name,
  segmented,
  size,
  value
}) => (
  <div
    className={classNames(
        `radio-column-${size}`,
        { selected: value === answer.answer }
    )}
    onClick={() => onChange(answer.answer)}
  >
    {answer.image && <img src={answer.image} role="presentation" />}
    <label
      className={classNames(
        { 'label-segmented': segmented },
        { selected: value === answer.answer },
      )}
      htmlFor={name}
    >
      <input
        onChange={() => onChange(answer.answer)}
        name={name}
        type="radio"
        checked={String(value) === String(answer.answer)}
        value={answer.answer}
      />
      <span>{answer.label || answer.answer}</span>
    </label>
  </div>
);

RadioOption.propTypes = {
  
  // Answer Used to generate option
  answer: PropTypes.shape({
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
  }),
  
  // Name of parent field for option
  name: PropTypes.string,
  
  // Change handler
  onChange: PropTypes.func.isRequired,
  
  // Number of overall answers, added to class
  size: PropTypes.number,
  
  // Converts from radio to segmented bar
  segmented: PropTypes.bool,
  
  // Value from parent field
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string
  ])
};

export default RadioOption;
