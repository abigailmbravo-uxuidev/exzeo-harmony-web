import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import Validation from 'react-validation';

const Dropdown = ({
  answers,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
  validateFormElement,
  /* eslint-disable react/prop-types */
  validations,
}) => (
  <div className={`form-group ${styleName} ${name}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description &&
        <span>
          <i className="fa fa-info-circle" data-tip data-for={name} />
          <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>
        </span>
      }
      {answers && answers.length > 0 ?
        <Validation.components.Select
          onBlur={event => validateFormElement(event.target.name)}
          value={value || ''} name={name || null} disabled={disabled}
          onChange={handleChange || null} validations={validations || []}
        >
          <option disabled value={''}>Please select...</option>
          {answers.map((answer, index) => (
            <option value={answer.answer || null} key={index}>{answer.answer || null}</option>
          ))}
        </Validation.components.Select> : null}
    </label>
  </div>
);

Dropdown.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    image: PropTypes.string,
  })),
  validateFormElement: PropTypes.func,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.string,
};

export default Dropdown;
