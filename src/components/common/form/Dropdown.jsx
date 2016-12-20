import React, { PropTypes } from 'react';

const Dropdown = ({ question, handleChange, answers, value, id, styleName = '' }) => (
  <div className={`form-group ${styleName} ${name}`}>
    <label htmlFor={id || null}>
      {question || null}
      {answers && answers.length > 0 ?
        <select value={value || ''} name={question || null} onChange={handleChange || null}>
          {answers.map((answer, index) => (
            <option value={answer.answer || null} key={index}>{answer.answer || null}</option>
          ))}
        </select> : null}
    </label>
  </div>
);

Dropdown.propTypes = {
  question: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  handleChange: PropTypes.func,
  styleName: PropTypes.string,
};

export default Dropdown;
