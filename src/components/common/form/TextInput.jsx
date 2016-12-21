import React, { PropTypes } from 'react';

const TextInput = ({ question, name, description, value, answerType, handleChange, styleName = '' }) => (
  <div className={`form-group ${styleName} ${name}`}>
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
    />
  </div>
);

TextInput.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
  handleChange: PropTypes.func,
  styleName: PropTypes.string,
};

export default TextInput;
