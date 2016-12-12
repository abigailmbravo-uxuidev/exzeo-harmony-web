/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for */
import React, { PropTypes } from 'react';

const RadioGroup = ({ question, answers, value, id, handleChange, segmented, styleName = '' }) => {
  const onClick = (answer) => {
    const newEvent = {
      target: {
        name: id,
        value: answer,
      },
    };
    handleChange(newEvent);
  };
  const classnames = segmented ? `form-group segmented ${styleName}` : `form-group ${styleName}`;
  return (
    <div className={classnames} role="group">
      <label className="group-label">{question || null}</label>
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
          <span onClick={() => onClick(answer)}>{answer || null}</span>
        </label>,
      ) : null}
    </div>
  );
};

RadioGroup.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
  segmented: PropTypes.bool,
  styleName: PropTypes.string,
};

export default RadioGroup;
