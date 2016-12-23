/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for, eqeqeq */
import React, { PropTypes } from 'react';

const RadioGroup = ({
  answers,
  description,
  disabled = false,
  handleChange,
  name,
  segmented = false,
  styleName = '',
  question,
  value,
}) => {
  const onClick = (answer) => {
    if (disabled) return;
    const newEvent = {
      target: {
        name,
        value: answer,
      },
    };
    handleChange(newEvent);
  };
  const classnames = `form-group ${segmented ? 'segmented' : ''} ${name} ${styleName} ${disabled ? 'disabled' : ''}`;
  return (
    <div className={classnames} role="group">
      <label className={`group-label ${segmented ? 'label-segmented' : ''}`}>
        {question || null}
      </label>
      {answers && answers.length > 0 ? answers.map((answer, index) =>
        <div onClick={() => onClick(answer.answer)} key={index}>
          {answer.image && <img src={answer.image} role="presentation" />}
          <label className={segmented ? 'label-segmented' : ''} htmlFor={index} key={index}>
            <input
              type="radio"
              value={answer.answer || null}
              key={index}
              name={name || null}
              checked={value == answer.answer}
              onChange={handleChange || null}
            />
            <span>{answer.answer || null}</span>
          </label>
        </div>,
      ) : null}
    </div>
  );
};

RadioGroup.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  question: PropTypes.string,
  segmented: PropTypes.bool,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default RadioGroup;
