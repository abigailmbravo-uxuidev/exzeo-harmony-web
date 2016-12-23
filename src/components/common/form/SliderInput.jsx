import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const SliderInput = ({
  description,
  disabled = false,
  handleChange,
  leftLabel,
  maxValue,
  minValue,
  name,
  question,
  rightLabel,
  step,
  styleName = '',
  value,
}) => (
  <div className={`form-group ${styleName} ${name}`}>
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
    <span>{leftLabel || Math.ceil(minValue) || null}</span>
    <input
      type={'range'}
      name={name || null}
      min={Math.ceil(minValue)}
      max={Math.floor(maxValue)}
      step={step || (maxValue - minValue) / 40}
      value={value || minValue}
      onChange={handleChange || null}
    />
    <span>{rightLabel || Math.floor(maxValue) || null}</span>
    <span><input
      type="text"
      value={value}
      onChange={handleChange}
      name={name}
    /></span>
  </div>
);

SliderInput.propTypes = {
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  leftLabel: PropTypes.string,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  name: PropTypes.string,
  rightLabel: PropTypes.string,
  question: PropTypes.string,
  step: PropTypes.number,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SliderInput;
