/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const BoolInput = ({
  description,
  disabled = false,
  handleChange,
  isSwitch = false,
  name,
  question,
  styleName = '',
  value,
}) => {
  const onChange = () => {
    if (disabled) return;
    const newEvent = {
      target: {
        name,
        value: !value,
      },
    };
    handleChange(newEvent);
  };
  const classnames = `form-group ${isSwitch ? 'switch' : ''} ${styleName} ${name} ${disabled ? 'disabled' : ''}`;
  return (
    <div className={classnames} >
      <label htmlFor={name || null} onClick={onChange}>
        {question || null}
        &nbsp;
        {description &&
          <span>
            <i className="fa fa-info-circle" data-tip data-for={name} />
            <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>
          </span>
        }
        <input
          type="checkbox"
          name={name || null}
          checked={value || false}
          onChange={onChange}
          disabled={disabled}
        />
{isSwitch && <div className="switch-div" />}
      </label>
    </div>
  );
};

BoolInput.propTypes = {
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  isSwitch: PropTypes.bool,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};

export default BoolInput;
