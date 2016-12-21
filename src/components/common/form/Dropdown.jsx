import React, { PropTypes } from 'react';

const Dropdown = ({ question, name, value, answers, handleChange, styleName = '' }) => (
  <div className={`form-group ${styleName} ${name}`}>
    <label htmlFor={name || null}>
      {question || null}
      {answers && answers.length > 0 ?
        <select value={value || ''} name={name || null} onChange={handleChange || null}>
          <option disabled selected value>Please select...</option>
          {answers.map((answer, index) => (
            <option value={answer.answer || null} key={index}>{answer.answer || null}</option>
          ))}
        </select> : null}
    </label>
  </div>
);

Dropdown.propTypes = {
  question: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  handleChange: PropTypes.func,
  styleName: PropTypes.string,
};

export default Dropdown;
