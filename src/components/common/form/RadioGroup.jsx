/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for, eqeqeq */
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import Rules from '../../Rules';

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
  validations,
}) => {
  const ruleArray = [];

  if (validations) {
    for (let i = 0; i < validations.length; i++) {
      ruleArray.push(Rules[`${validations[i]}`]);
    }
    console.log(ruleArray);
  }

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
        &nbsp;
        {description && <i className="fa fa-info-circle" data-tip data-for={name} />}
        {description && <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>}

      </label>
      <div className="segmented-answer-wrapper">
        {answers && answers.length > 0 ? answers.map((answer, index) =>
          <div
            className={`radio-column-${answers.length}${value === answer.answer ? ' selected' : ''}`}
            onClick={() => onClick(answer.answer)} key={index}
          >
            {answer.image && <img src={answer.image} role="presentation" />}
            <label className={segmented ? 'label-segmented' : ''} key={index}>
              <Field
                type="radio"
                component="input"
                value={answer.answer}
                key={index}
                name={name}
                onChange={handleChange}
                validate={ruleArray}
              />
              <span>{answer.answer || null}</span>
            </label>
          </div>,
          ) : null}
      </div>
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
