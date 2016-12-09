/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';

const RadioGroup = ({ question, answers, value, id, handleChange, segmented }) => (
  <div className={segmented ? 'form-group segmented' : 'form-group'} role="group">
    {question || null}
    {answers && answers.length > 0 ? answers.map((answer, index) =>
      <label htmlFor={index} key={index}>
        <input
          type="radio"
          value={answer || null}
          key={index}
          name={id || null}
          checked={value === answer}
          onChange={handleChange || null}
        />
        <span onChange={handleChange}>{answer || null}</span>
      </label>,
    ) : null}
  </div>
);

RadioGroup.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  segmented: PropTypes.bool,
};

export default RadioGroup;
