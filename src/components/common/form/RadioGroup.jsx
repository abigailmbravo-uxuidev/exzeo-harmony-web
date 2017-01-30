/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for, eqeqeq */
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../../Rules';

const RenderField = ({ input, segmented, answers, value, click, label, name,
  description, question, styleName, disabled,
   meta: { touched, error, warning } }) => {
  const classnames = `form-group ${segmented ? 'segmented' : ''} ${label} ${styleName} ${disabled ? 'disabled' : ''}`;
  return (
    <div className={classnames} role="group">
      <label className={`group-label ${segmented ? 'label-segmented' : ''}`}>
        {question || null}
           &nbsp;
        {description && <i className="fa fa-info-circle" data-tip data-for={label} />}
        {description && <ReactTooltip place="right" id={label} type="dark" effect="float">{description}</ReactTooltip>}

      </label>
      <div className={`segmented-answer-wrapper ${touched && error ? 'error' : ''}`}>
        {answers && answers.length > 0 ? answers.map((answer, index) =>
          <div
            className={`radio-column-${answers.length}${value === answer.answer ? ' selected' : ''}`}
            onClick={() => click(answer.answer)} key={index}
          >
            {answer.image && <img src={answer.image} role="presentation" />}
            <label className={segmented ? 'label-segmented' : ''} key={index}>
              <input
                onChange={input.onChange || ''}
                name={input.name || ''}
                type="radio"
                value={answer.answer}
              />
              <span>{answer.answer || null}</span>
            </label>
          </div>,
             ) : null}
      </div>
    </div>
  );
};

const RadioGroup = ({
  answers,
  description,
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
      onChange={handleChange || null}
      validate={ruleArray}
    />
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
