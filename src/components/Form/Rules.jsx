import validator from 'validator';

const rules = {
  required: value => (value ? undefined : 'Field Required'),
  email: value => (validator.isEmail(value) ? undefined : 'Not a valid email address'),
  optionalEmail: value => ((!value || validator.isEmail(value)) ? undefined : 'Not a valid email address'),
  phone: value => (!value || (value.match && value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g)) ? undefined : 'is not a valid Phone Number.'),
  minLength3: value => (!value || validator.isLength(value, { min: 3 }) ? undefined : 'Please enter at least 3 characters'),
  onlyAlphaNumeric: value => (!value || validator.isAlphanumeric(value) ? undefined : 'Invalid characters'),
  invalidCharacters: value => (value.match(/^[a-zA-Z\d\-_.,&\s]+$/) ? undefined : 'Invalid characters'),
  numberDashesOnly: value => (value.match(/^(\d+-?)+\d+$/) ? undefined : 'Only numbers and dashes allowed'),
  maxLength8AlphaNumeric: value => (!value || (validator.isLength(value, { max: 8 }) && validator.isAlphanumeric(value)) ? undefined : 'Only 8 letters or numbers allowed'),
  maxLength255: value => (!value || (validator.isLength(value, { max: 255 })) ? undefined : 'Only 255 characters allowed'),
  maxLength2OnlyAlpha: value => (!value || (validator.isLength(value, { max: 2 }) && validator.isAlpha(value)) ? undefined : 'Only 2 letters allowed'),
  isValidDate: value => moment(value,'MM/DD/YYYY', true).isValid() || moment(value,'YYYY-MM-DD', true).isValid() ? undefined : 'Not a valid date'
};

export function combineRules(validations, variables) {
  const ruleArray = [];

  if (validations) {
    for (let i = 0; i < validations.length; i += 1) {
      if (rules[validations[i]] && (!variables || (!variables.min && !variables.max))) {
        ruleArray.push(rules[`${validations[i]}`]);
      } else if (validations[i] === 'range' && variables && variables.min && variables.max) {
        const range = (values) => {
          const valid = values <= variables.max && values >= variables.min ? undefined : 'Not a valid range';
          return valid;
        };
        ruleArray.push(range);
      } else if (validations[i] === 'date' && variables && variables.min && variables.max) {
        ruleArray.push(rules.isValidDate);
      }
    }
  }

  if (variables.dependsOn) {
    const checkFields = (value, allValues) => {
      if (value && value.length > 0) return undefined;
      for (const field of variables.dependsOn) {
        if (allValues[field]) return 'Field Required';
      }

      return undefined;
    };
    ruleArray.push(checkFields);
  }

  return ruleArray;
}

export default rules;
