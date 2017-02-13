/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for, eqeqeq */
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../../forms/Rules';

const RenderField = ({
  answerType,
  input,
  segmented,
  answers,
  displayValue,
  click,
  label,
  description,
  question,
  styleName,
  disabled,
  meta: {
    touched,
    error,
  },
}) => {
  const classnames = `form-group ${segmented ? 'segmented' : ''} ${label} ${styleName} ${disabled ? 'disabled' : ''}`;
  if (answerType === 'hidden') {
    return (<Field name={input.name} component="input" type="hidden" />);
  }
  return (
    <div className={classnames} role="group">
      <label className={`group-label ${segmented ? 'label-segmented' : ''}`}>
        {question || null}
           &nbsp;
        {description && <i className="fa fa-info-circle" data-tip data-for={label} />}
        {description && <ReactTooltip place="right" id={label} type="dark" effect="float">{description}</ReactTooltip>}
        {displayValue && <input
          type="text"
          value={displayValue}
          readOnly
        />}
      </label>
      <div className={`segmented-answer-wrapper ${touched && error ? 'error' : ''}`}>
        {answers && answers.length > 0 ? answers.map((answer, index) =>
          <div
            className={`radio-column-${answers.length}${input.value === answer.answer ? ' selected' : ''}`}
            onClick={() => click(answer.answer)} key={index}
          >
            {answer.image && <img src={answer.image} role="presentation" />}
            <label className={segmented ? 'label-segmented' : ''} key={index}>
              <input
                onChange={input.onChange || ''}
                name={input.name || ''}
                type="radio"
                defaultChecked={input.value === answer.answer}
                value={answer.answer}
              />
              <span>{answer.label || answer.answer || null}</span>
            </label>
          </div>,
             ) : null}
      </div>
    </div>
  );
};

RenderField.propTypes = {
  click: PropTypes.func,
  answerType: PropTypes.string,
  displayValue: PropTypes.string,
  validations: PropTypes.any, // eslint-disable-line
  meta: PropTypes.any, // eslint-disable-line
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    image: PropTypes.string,
  })),
  label: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  question: PropTypes.string,
  segmented: PropTypes.bool,
  styleName: PropTypes.string,
  input: PropTypes.any,  // eslint-disable-line
};


const RadioGroup = ({
  answerType,
  answers,
  description,
  displayValue,
  disabled = false,
  handleChange,
  segmented = false,
  styleName = '',
  question,
  value,
  validations,
  name,
}) => {
  const ruleArray = combineRules(validations);

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

  return (
    <Field
      answerType={answerType}
      type="radio"
      name={name || ''}
      label={name}
      click={onClick}
      component={RenderField}
      question={question}
      description={description}
      answers={answers}
      segmented={segmented}
      value={value}
      styleName={styleName}
      displayValue={displayValue}
      onChange={handleChange || null}
      validate={ruleArray}
    />
  );
};

RadioGroup.propTypes = {
  displayValue: PropTypes.string,
  validations: PropTypes.any, // eslint-disable-line
  answerType: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    display: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
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
