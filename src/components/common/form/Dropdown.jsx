import React, { PropTypes } from 'react';

const Dropdown = ({
  answers,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
}) => (
  <div className={`form-group ${styleName} ${name}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description && <span className="tooltip"><i className="fa fa-info-circle" aria-hidden="true" /><span className="tooltiptext">{description}</span></span>}
      {answers && answers.length > 0 ?
        <select value={value || ''} name={name || null} disabled={disabled} onChange={handleChange || null}>
          <option disabled value={''}>Please select...</option>
          {answers.map((answer, index) => (
            <option value={answer.answer || null} key={index}>{answer.answer || null}</option>
          ))}
        </select> : null}
    </label>
  </div>
);

Dropdown.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.string,
};

export default Dropdown;
