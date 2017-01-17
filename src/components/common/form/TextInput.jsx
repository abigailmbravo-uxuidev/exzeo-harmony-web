import React, { PropTypes } from 'react';
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
  hasError,
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
    <input
      className={hasError ? 'error' : ''}
      type={answerType || 'text'}
      name={name || null}
      value={value || (answerType === 'number' ? null : '')}
      onChange={handleChange || null}
      disabled={disabled}
    />
    {hasError &&
      <span style={'color:red;'}>
        { 'Error' }
      </span>
    }
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
