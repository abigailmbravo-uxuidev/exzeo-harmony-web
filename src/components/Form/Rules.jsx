import validator from 'validator';
import moment from 'moment';

const rules = {
  required: value => (value ? undefined : 'Field Required'),
  email: value => (validator.isEmail(value) ? undefined : 'Not a valid email address'),
  optionalEmail: value => ((!value || validator.isEmail(value)) ? undefined : 'Not a valid email address'),
  phone: value => (!value || (value.match && value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g)) ? undefined : 'is not a valid Phone Number.'),
  date: value => (validator.isISO8601(value) ? undefined : 'is not a valid Date.'),
  minLength3: value => (!value || validator.isLength(value, { min: 3 }) ? undefined : 'Please enter at least 3 characters'),
  onlyAlphaNumeric: value => (!value || validator.isAlphanumeric(value) ? undefined : 'Invalid characters'),
  invalidCharacters: value => (!value.match(/\/|\\/) ? undefined : 'Invalid characters'),
  numberDashesOnly: value => (value.match(/^(\d+-?)+\d+$/) ? undefined : 'Only numbers and dashes allowed'),
  maxLength8AlphaNumeric: value => (!value || (validator.isLength(value, { max: 8 }) && validator.isAlphanumeric(value)) ? undefined : 'Only 8 letters or numbers allowed'),
  maxLength255: value => (!value || (validator.isLength(value, { max: 255 })) ? undefined : 'Only 255 characters allowed'),
  maxLength2OnlyAlpha: value => (!value || (validator.isLength(value, { max: 2 }) && validator.isAlpha(value)) ? undefined : 'Only 2 letters allowed')
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
        const range = (values) => {
          const min = new Date(moment.utc(variables.min).format('MM/DD/YYYY'));
          const max = new Date(moment.utc(variables.max).format('MM/DD/YYYY'));
          const value = new Date(moment.utc(values).format('MM/DD/YYYY'));

          const valid = value <= max && value >= min ? undefined : 'Not a valid date range';
          return valid;
        };
        ruleArray.push(range);
      }
    }
  }
  return ruleArray;
}

export default rules;
