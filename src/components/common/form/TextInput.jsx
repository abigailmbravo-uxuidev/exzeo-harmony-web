import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import ReactTooltip from 'react-tooltip';

const TextInput = ({
  answerType,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
}) => {
  const required = value => value ? undefined : 'Required';

  const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
);

  return (
    <div className={`form-group ${styleName} ${name} ${disabled ? 'disabled' : ''}`}>
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
      <Field
        label={name}
        component={renderField}
        type={answerType || 'text'}
        name={name || null}
        onChange={handleChange || null}
        disabled={disabled}
        validate={[required]}
      />
    </div>
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
