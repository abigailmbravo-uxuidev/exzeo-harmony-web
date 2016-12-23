/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';

const BoolInput = ({
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
        <input
          type="checkbox"
          name={name || null}
          checked={value || false}
          onChange={onChange}
          disabled={disabled}
        />
        {isSwitch && <div />}
      </label>
    </div>
  );
};

BoolInput.propTypes = {
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
