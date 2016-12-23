import React, { PropTypes } from 'react';

const SliderInput = ({ question, name, description, value, minValue, maxValue, leftLabel, rightLabel, answerType, handleChange, styleName = '' }) => (
  <div className={`form-group range-component ${styleName} ${name}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description && <span className="tooltip"><i className="fa fa-info-circle" aria-hidden="true" /><span className="tooltiptext">{description}</span></span>}
    </label>
    <div className="range-wrapper">
            <div className="range-control-wrapper">
                    <span className="range-limit">{leftLabel || Math.ceil(minValue) || null}</span>
                    <input
                      type={answerType || 'range'}
                      name={name || null}
                      min={Math.ceil(minValue)}
                      max={Math.floor(maxValue)}
                      step={1000}
                      value={value || minValue}
                      onChange={handleChange || null}
                    />
            <span className="range-limit">{rightLabel || Math.floor(maxValue) || null}</span>
            </div>
            <span className="range-value"><input
              type="text"
              value={value}
              onChange={handleChange}
              name={name}
            /></span>
        </div>
  </div>
);

SliderInput.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
  handleChange: PropTypes.func,
  styleName: PropTypes.string,
};

export default SliderInput;
