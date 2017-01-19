import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../../Rules';

const RenderField = ({ input, label, type,
  description, question, name, styleName, disabled,
   meta: { touched, error, warning } }) => (
     <div className={`form-group ${styleName} ${label} ${disabled ? 'disabled' : ''} ${touched && error ? 'error' : ''}`}>
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
       <input {...input} type={type} />
       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
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
  styleName = '',
  validations,
}) => {
  const ruleArray = combineRules(validations);


  return (
    <Field
      description={description}
      styleName={styleName}
      question={question}
      label={name}
      component={RenderField}
      type={answerType || 'text'}
      name={name || null}
      onChange={handleChange || null}
      disabled={disabled}
      validate={ruleArray}
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
