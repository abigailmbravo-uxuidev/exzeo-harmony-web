import React from 'react';

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

export default DisplayInput;
