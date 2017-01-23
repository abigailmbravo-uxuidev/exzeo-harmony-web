import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../../Rules';

const RenderField = ({ input, label, type,
  description, question, name, styleName, disabled, value, handleChange,
   meta: { touched, error, warning } }) => (
     <div className={`form-group ${styleName} ${label} ${disabled ? 'disabled' : ''} ${touched && error ? 'error' : ''} ${touched && !error ? 'valid' : ''}`}>
       <label htmlFor={name || null}>
         {question || null}
          &nbsp;
         {description &&
         <span>
           <i className="fa fa-info-circle" data-tip data-for={name} />
           <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>
         </span>
          }
       </label>
       <input
         {...input}
         onChange={event => {
           input.onChange(event);
           handleChange(event);
         }}
         type={type}
       />
       {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
     </div>
);

RenderField.propTypes = {
  description: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const TextInput = ({
  answerType,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  value,
  styleName = '',
  validations,
}) => {
  const ruleArray = combineRules(validations);

  console.log(value);
  return (
    <Field
      description={description}
      styleName={styleName}
      question={question}
      label={name}
      component={RenderField}
      type={answerType || 'text'}
      name={name || null}
      handleChange={handleChange || null}
      disabled={disabled}
      validate={ruleArray}
      defaultValue={value}
      value={value}
    />
  );
};

TextInput.propTypes = {
  answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextInput;
