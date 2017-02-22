import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { combineRules } from '../forms/Rules';

export default function reduxFormField(fieldComponent) {
  return class FormField extends Component {

    static propTypes = {

      /**
       * Disabled prop for input
       */
      disabled: PropTypes.bool,

      /**
       * Handle change for controlled component
       */
      handleChange: PropTypes.func,

      /**
       * Tooltip hint for component
       */
      hint: PropTypes.string,

      /**
       * String to put in label
       */
      label: PropTypes.string.isRequired,

      /**
       * Name of input element, needed for onChange
       */
      name: PropTypes.string.isRequired,

      /**
       * Type for input
       */
      type: PropTypes.oneOf([
        'bool',
        'date',
        'email',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'string',
        'tel',
        'text',
      ]),

      /**
       * class put on form-group
       */
      styleName: PropTypes.string,

      /**
       * Validations array for redux field
       */
      validations: PropTypes.arrayOf(PropTypes.string),

      /**
       * Value for the input
       */
      value: PropTypes.any, // eslint-disable-line react/forbid-prop-types

    }
    static defaultProps = {
      disabled: false,
      hint: '',
      styleName: '',
      type: 'text',
    }

    render() {
      const {
        disabled,
        handleChange,
        hint,
        label,
        name,
        styleName,
        type,
        validations,
        value,
      } = this.props;

      const ruleArray = combineRules(validations);

      return (
        <Field
          {...this.props}
          defaultValue={value}
          disabled={disabled}
          label={label}
          hint={hint}
          styleName={styleName}
          component={fieldComponent}
          type={type}
          name={name}
          handleChange={handleChange}
          validate={ruleArray}
          value={value}
        />
      );
    }

  };
}
