import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

const ListSelection = ({
  answerType,
  description,
  disabled = false,
  handleChange,
  name,
  question,
  styleName = '',
  value,
}) => (
  <div className={`form-group ${styleName} ${name} ${disabled ? 'disabled' : ''}`}>
    <label htmlFor={name || null}>
      {question || null}
      &nbsp;
      {description &&
      <span>
          <i className="fa fa-info-circle" data-tip data-for={name} />
          <ReactTooltip place="right" id={name} type="dark" effect="float">{description}</ReactTooltip>
        </span>
      }
    </label>
    <ul className="results result-cards">
      <li>
        <a href="">
          <i className="card-icon fa fa-map-marker"></i>
          <section>
            <h4>1234 Main Street</h4>
            <p>Ocala Florida 33333</p>
          </section>
          <i className="fa fa-caret-right circle"></i>
        </a>
      </li>
    </ul>
  </div>
);

ListSelection.propTypes = {
  answerType: PropTypes.oneOf(['string', 'email', 'password', 'text', 'number', 'date', 'range', 'tel', 'search', 'radio', 'bool']),
  description: PropTypes.string,
  disabled: PropTypes.bool,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  question: PropTypes.string,
  styleName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ListSelection;
