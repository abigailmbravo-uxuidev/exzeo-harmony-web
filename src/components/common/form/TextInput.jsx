import React, { PropTypes } from 'react';

const TextInput = ({ question, description, id, value, answerType, handleChange, styleName = '' }) => (
  <div className={`form-group ${styleName}`}>
    <label htmlFor={id || null}>{question || null}</label>
    <input
      type={answerType || 'text'}
      name={id || null}
      value={value || ''}
      onChange={handleChange || null}
    />
    <small>{description}</small>
  </div>
);

TextInput.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  answerType: PropTypes.oneOf(['email', 'password', 'text', 'number', 'radio', 'bool']),
  handleChange: PropTypes.func,
  styleName: PropTypes.string,
};

export default TextInput;
