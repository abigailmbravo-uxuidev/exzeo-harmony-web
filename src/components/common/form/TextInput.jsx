import React, { PropTypes } from 'react';

const TextInput = ({
  answerType,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
}) => (
  <div className={`form-group ${styleName} ${name} ${disabled ? 'disabled' : ''}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description && <span className="tooltip"><i className="fa fa-info-circle" aria-hidden="true" /><span className="tooltiptext">{description}</span></span>}
    </label>
    <input
      type={answerType || 'text'}
      name={name || null}
      value={value || (answerType === 'number' ? null : '')}
      onChange={handleChange || null}
      disabled={disabled}
    />
  </div>
);

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
