import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import Validation from 'react-validation';

const TextInput = ({
  answerType,
  description,
  validations,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
  validateFormElement,
}) => (
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
    <Validation.components.Input
      errorContainerClassName="form-group error"
      onBlur={event => validateFormElement(event.target.name)}
      type={answerType || 'text'}
      name={name || null}
      value={value || (answerType === 'number' ? null : '')}
      onChange={handleChange || null}
      disabled={disabled}
      validations={validations ? validations : []}
    />
  </div>
);

TextInput.propTypes = {
  validateFormElement: PropTypes.func,
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
