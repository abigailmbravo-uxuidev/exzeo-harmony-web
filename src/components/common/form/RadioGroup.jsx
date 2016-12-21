/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for, eqeqeq */
import React, { PropTypes } from 'react';

const RadioGroup = ({ question, name, value, answers, handleChange, segmented, styleName = '' }) => {
  const onClick = (answer) => {
    const newEvent = {
      target: {
        name,
        value: answer,
      },
    };
    handleChange(newEvent);
  };
  const classnames = `form-group ${segmented ? 'segmented' : ''} ${name} ${styleName}`;
  return (
    <div className={classnames} role="group">
      <label className={`group-label ${segmented ? 'label-segmented' : ''}`}>{question || null}</label>
      {answers && answers.length > 0 ? answers.map((answer, index) =>
        <label className={segmented ? 'label-segmented' : ''} htmlFor={index} key={index}>
          <input
            type="radio"
            value={answer.answer || null}
            key={index}
            name={name || null}
            checked={value == answer.answer}
            onChange={handleChange || null}
          />
          <span onClick={() => onClick(answer.answer)}>{answer.answer || null}</span>
        </label>,
      ) : null}
    </div>
  );
};

RadioGroup.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  handleChange: PropTypes.func,
  segmented: PropTypes.bool,
  styleName: PropTypes.string,
};

export default RadioGroup;
