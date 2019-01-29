import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const SelectInputAgents = ({
  agents,
  hint,
  input,
  label,
  styleName,
  meta
}) => {
  const { onChange, name, value, disabled } = input;
  const { touched, error, warning } = meta;
  const formGroupStyles = classNames('form-group select', { styleName }, { name });
  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const Error = touched && (error || warning) && <span style={{ color: 'red' }}>{error || warning}</span>;

  const onKeyPress = (event, answer) => {
    if (event && event.preventDefault) event.preventDefault();
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  return (
    <div className={formGroupStyles} data-test={name}>
      <label htmlFor={name} data-test={`${name}-label`}>
        {label}
        {Hint}
      </label>
      {agents && agents.length > 0 ? (
        <select
          onKeyPress={(event => onKeyPress(event, value))}
          tabIndex={'0'}
          value={value}
          name={name}
          disabled={disabled}
          onChange={onChange}
          aria-activedescendant={value}
          data-test={`${name}-select`}
        >
          <option aria-label={'Please select...'} disabled value={''}>Please select...</option>
          {agents.map((agent, index) => (
            <option aria-label={`${agent.firstName} ${agent.lastName}`} value={agent.agentCode} key={index}>
              {`${agent.firstName} ${agent.lastName}`}
            </option>
          ))}
        </select>
      ) : null}

      { Error }
    </div>
  );
};

SelectInputAgents.propTypes = {
  /**
   * Answers array used to generate options
   */
  agents: PropTypes.any, // eslint-disable-line

  /**
   * Tooltip for user
   */
  hint: PropTypes.string,
  // Validations
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string
  }),
  /**
   * Input provided by redux-form field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
  }),

  /**
   * Label for field
   */
  label: PropTypes.string,

  /**
   * Styles for form group
   */
  styleName: PropTypes.string
};

SelectInputAgents.defaultProps = {
  input: {
    onChange: () => {}
  }
};

export default reduxFormField(SelectInputAgents);
