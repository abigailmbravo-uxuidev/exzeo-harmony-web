import React, { PropTypes } from 'react';

const DisplayField = ({
  name,
  label,
  value,
  displayValue
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={displayValue || value}
      readOnly
    />
  </div>
);

DisplayField.propTypes = {
  displayValue: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,// eslint-disable-line
};

export default DisplayField;
