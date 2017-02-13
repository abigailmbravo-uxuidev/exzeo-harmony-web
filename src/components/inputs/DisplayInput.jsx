import React, { PropTypes } from 'react';

const DisplayInput = ({
  name,
  question,
  value,
  displayValue,
}) => (
  <div className="form-group">
    <label htmlFor={name}>
      {question}
    </label>
    <input
      type="text"
      name={name}
      value={displayValue || value}
      readOnly
    />
  </div>
);

DisplayInput.propTypes = {
  validations: PropTypes.any,// eslint-disable-line
  displayValue: PropTypes.string,
  name: PropTypes.string,
  question: PropTypes.string,
  value: PropTypes.any,// eslint-disable-line
};

export default DisplayInput;
