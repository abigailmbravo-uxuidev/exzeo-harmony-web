/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../forms/Rules';

const renderField = ({
  input,
  handleChange,
  isSwitch,
  description,
  question,
  styleName,
}) => {
  const onChange = () => {
    if (input.disabled) return;
    const newEvent = {
      target: {
        name: input.name,
        value: !input.value,
      },
    };
    handleChange(newEvent);
  };
  const classnames = `form-group ${isSwitch ? 'switch' : ''} ${styleName} ${name} ${input.disabled ? 'disabled' : ''}`;
  return (
    <div className={classnames} >
      <label
        htmlFor={input.name || null}
        onClick={(event) => {
          input.onChange(!input.value);
          onChange(event);
        }}
      >
        {question || null}
        &nbsp;
        {description &&
          <span>
            <i className="fa fa-info-circle" data-tip data-for={name} />
            <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>
          </span>
        }
        <input
          {...input}
          type="checkbox"
          checked={input.value}
          onChange={(event) => {
            input.onChange(!input.value);
            onChange(event);
          }}
        />
        {isSwitch && <div className="switch-div" />}
      </label>
    </div>
  );
};

renderField.propTypes = {
  input: PropTypes.any,// eslint-disable-line
  handleChange: PropTypes.any,// eslint-disable-line
  isSwitch: PropTypes.any,// eslint-disable-line
  description: PropTypes.any,// eslint-disable-line
  question: PropTypes.any,// eslint-disable-line
  styleName: PropTypes.any,// eslint-disable-line
  meta: PropTypes.any,// eslint-disable-line
};

const BoolInput = ({
  description,
  disabled,
  handleChange,
  isSwitch = false,
  name,
  question,
  styleName = '',
  value,
  validations,
}) => {
  const ruleArray = combineRules(validations);

  return (
    <Field
      disabled={disabled || false}
      description={description}
      component={renderField}
      name={name || null}
      value={value}
      handleChange={handleChange}
      question={question}
      isSwitch={isSwitch}
      styleName={styleName}
      validate={ruleArray}
    />
  );
};

BoolInput.propTypes = {
  validations: PropTypes.any,// eslint-disable-line
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  isSwitch: PropTypes.bool,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default BoolInput;
