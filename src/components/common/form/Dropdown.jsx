import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import { combineRules } from '../../Rules';

const Dropdown = ({
  answers,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
  validations,
}) => {
  const ruleArray = combineRules(validations);

  return (<div className={`form-group ${styleName} ${name}`}>
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
        <Field
          component="select"
          validate={ruleArray}
          value={value || ''} name={name || null} disabled={disabled}
          onChange={handleChange || null}
        >
          <option disabled value={''}>Please select...</option>
          {answers.map((answer, index) => (
            <option value={answer.answer || null} key={index}>{answer.answer || null}</option>
          ))}
        </Field> : null}
    </label>
  </div>
  );
};

Dropdown.propTypes = {
  validations: PropTypes.any, // eslint-disable-line
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
