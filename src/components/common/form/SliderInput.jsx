import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const SliderInput = ({
  description,
  disabled = false,
  handleChange,
  leftLabel,
  maxValue,
  minValue,
  valueDefault,
  name,
  question,
  rightLabel,
  step,
  styleName = '',
  value,
}) => (
  <div className={`form-group range-component ${styleName} ${name}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description && <i className="fa fa-info-circle" data-tip data-for={name} />}
      {description && <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>}
    </label>
    <div className="range-wrapper">
      <div className="range-control-wrapper">
        <span className="range-limit">{leftLabel || Math.ceil(minValue) || '0'}</span>
        <input
          type="range"
          name={name || null}
          min={Math.ceil(minValue)}
          max={Math.floor(maxValue)}
          step={step}
          value={value || valueDefault || minValue}
          onChange={handleChange || null}
        />
        <span className="range-limit">{rightLabel || Math.floor(maxValue) || null}</span>
      </div>
      <span className="range-value">
        <input
          type="text"
          value={`$ ${value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}` ||
            `$ ${valueDefault.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
          onChange={handleChange}
          name={name}
        />
      </span>
    </div>
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
