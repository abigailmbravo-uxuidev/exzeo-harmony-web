import React, { PropTypes } from 'react';

const Dropdown = ({ question, handleChange, answers, value, id }) => (
  <div className="form-group">
    <label htmlFor={id || null}>
      {question || null}
      {answers && answers.length > 0 ?
        <select value={value || null} name={id || null} onChange={handleChange || null}>
          {answers.map((answer, index) => (
            <option value={answer || null} key={index}>{answer || null}</option>
          ))}
        </select> : null}
    </label>
  </div>
);

Dropdown.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func,
};

export default Dropdown;
