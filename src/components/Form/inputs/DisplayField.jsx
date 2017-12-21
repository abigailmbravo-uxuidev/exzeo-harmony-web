import React, { PropTypes } from 'react';
import classNames from 'classnames';
import reduxFormField from './reduxFormField';

export const DisplayInput = ({
  label,
  input,
  displayValue,
  styleName
}) => (
  <div className={classNames('form-group', input.name, styleName)} id={input.name}>
    <label htmlFor={input.name}>
      {label}
    </label>
    <input
      tabIndex={'0'}
      type="text"
      name={input.name}
      value={displayValue || (!Number.isNaN(Number(input.value)) ? `$ ${input.value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : input.value)}
      readOnly
    />
  </div>
);

DisplayInput.propTypes = {
  // Value to display on input, takes precedence over the redux-form provided value
  displayValue: PropTypes.string,
  // Label for form field
  label: PropTypes.string,
  // input props provided by redux-form
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
    // Name added to class on render
  styleName: PropTypes.string
};

DisplayInput.defaultProps = {
  input: {}
};

export default reduxFormField(DisplayInput);
