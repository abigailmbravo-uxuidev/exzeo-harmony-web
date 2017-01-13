import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';
// Use Object.assign or any similar API to merge a rules
// NOTE: IE10 doesn't have Object.assign API natively. Use polyfill/babel plugin.
Object.assign(Validation.rules, {
    // Key name maps the rule
  required: {
        // Function to validate value
        // NOTE: value might be a number -> force to string
    rule: value => value.toString().trim(),
        // Function to return hint
        // You may use current value to inject it in some way to the hint
    hint: () => <span style={{ color: 'red' }} className="form-error is-visible">field is Required</span>,
  },
  email: {
        // Example usage with external 'validator'
    rule: value => validator.isEmail(value),
    hint: value => <span style={{ color: 'red' }} className="form-error is-visible">{value} is not a valid Email.</span>,
  },
  date: {
        // Example usage with external 'validator'
    rule: value => validator.isDate(value),
    hint: value => <span style={{ color: 'red' }} className="form-error is-visible">{value} is not a valid Date.</span>,
  },
  phone: {
        // Example usage with external 'validator'
    rule: value => value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g),
    hint: value => <span style={{ color: 'red' }} className="form-error is-visible">{value} is not a valid Phone Number.</span>,
  },
    // This example shows a way to handle common task - compare two fields for equality
  password: {
        // rule function can accept argument:
        // components - components registered to Form mapped by name
    rule: (value, components) => {
      const password = components.password.state;
      const passwordConfirm = components.passwordConfirm.state;
      const isBothUsed = password
                && passwordConfirm
                && password.isUsed
                && passwordConfirm.isUsed;
      const isBothChanged = isBothUsed && password.isChanged && passwordConfirm.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === passwordConfirm.value;
    },
    hint: () => <span style={{ color: 'red' }} className="form-error is-visible">Passwords should be equal.</span>,
  },
    // Define API rule to show hint after API error response
  api: {
    hint: value => (
      <button
        style={{ color: 'red' }}
        className="form-error is-visible"
      >
                API Error on {value} value. Focus to hide.
            </button>
        ),
  },
});
