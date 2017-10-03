/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import FieldHint from './FieldHint';
import reduxFormField from './reduxFormField';

export const CheckInput = ({
  hint,
  input,
  isSwitch,
  label,
  styleName,
  tabIndex,
  autoFocus
}) => {
  const {
    disabled,
    name,
    value,
    onChange
  } = input;

  const formGroupStyles = classNames(
    'form-group',
    name,
    styleName,
    { active: input.value },
    { inactive: !input.value },
    { disabled },
    { switch: isSwitch }
  );

  const Hint = hint && (<FieldHint name={name} hint={hint} />);
  const onKeyPress = (event, answer) => {
    if (event.charCode === 13) {
      onChange(answer);
    }
  };

  const Switch = isSwitch && (<div className="switch-div" tabIndex={tabIndex} onKeyPress={event => onKeyPress(event, !value)} />);


  return (
    <div className={formGroupStyles} id={name}>
      <label htmlFor={name} onClick={() => onChange(!value)}>
        {label} &nbsp; {Hint}
        <input
          autoFocus={autoFocus}
          {...input}
          type="checkbox"
          checked={value}
          onChange={() => onChange(!value)}
        />
        {Switch}
      </label>
    </div>
  );
};

CheckInput.propTypes = {

  /**
   * Tool tip hint
   */
  hint: PropTypes.string,

  /**
   * Input properties from redux field
   */
  input: PropTypes.shape({
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]) // eslint-disable-line
  }),

  /**
   * Converts checkbox to switch
   */
  isSwitch: PropTypes.bool,

  /**
   * Label for component
   */
  label: PropTypes.string,

  /**
   * Classname for form-group
   */
  styleName: PropTypes.string
};

CheckInput.defaultProps = {
  input: {
    onChange: () => {},
    value: false
  }
};

export default reduxFormField(CheckInput);
