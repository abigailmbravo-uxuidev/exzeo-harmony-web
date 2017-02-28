import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import { combineRules } from '../Rules';

export default function reduxFormField(fieldComponent) {
  return class FormField extends Component {

    static propTypes = {

      /**
       * Disabled prop for input
       */
      disabled: PropTypes.bool,

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
        'hidden',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'select',
        'slider',
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
        hint,
        label,
        name,
        styleName,
        type,
        validations,
      } = this.props;

      const ruleArray = combineRules(validations);

      return (
        <Field
          {...this.props}
          disabled={disabled}
          label={label}
          hint={hint}
          styleName={styleName}
          component={fieldComponent}
          type={type === 'radio' ? null : type}
          name={name}
          validate={ruleArray}
        />
      );
    }

  };
}
