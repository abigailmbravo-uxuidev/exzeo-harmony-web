/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';

const BoolInput = ({ question, id, value, handleChange, isSwitch, styleName = '' }) => {
  const onChange = () => {
    const newEvent = {
      target: {
        name: id,
        value: !value,
      },
    };
    handleChange(newEvent);
  };
  const classnames = isSwitch ? `form-group switch ${styleName}` : `form-group ${styleName}`;
  return (
    <div className={classnames} >
      <label htmlFor={id || null} onClick={onChange}>
        {question || null}
        <input
          type="checkbox"
          name={id || null}
          checked={value || false}
          onChange={onChange}
        />
        {isSwitch && <div />}
      </label>
    </div>
  );
};

BoolInput.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
  isSwitch: PropTypes.bool,
  styleName: PropTypes.string,
};

export default BoolInput;
