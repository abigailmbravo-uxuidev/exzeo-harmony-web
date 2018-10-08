import validator from 'validator';
import moment from 'moment';

const calculatedValue = (value) => {
  const numberValue = String(value).replace(/\D+/g, '');
  if (Number(Math.round(numberValue / 1000) * 1000) >= 100000) {
    return Number(Math.round(numberValue / 1000) * 1000);
  }
  return Number(numberValue);
};

const rules = {
  required: value => (value ? undefined : 'Field Required'),
  email: value => (validator.isEmail(value) ? undefined : 'Not a valid email address'),
  optionalEmail: value => ((!value || validator.isEmail(value)) ? undefined : 'Not a valid email address'),
  phone: value => (!value || (value.match && value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g)) ? undefined : 'is not a valid Phone Number.'),
  minLength3: value => (!value || validator.isLength(value, { min: 3 }) ? undefined : 'Please enter at least 3 characters'),
  onlyAlphaNumeric: value => (!value || value.match(/^[a-zA-Z0-9 ]+$/) ? undefined : 'Invalid characters'),
  invalidCharacters: value => (value.match(/^[a-zA-Z\d\-_.,&\s]+$/) ? undefined : 'Invalid characters'),
  numberDashesOnly: value => (value.match(/^(\d+-?)+\d+$/) ? undefined : 'Only numbers and dashes allowed'),
  maxLength8AlphaNumeric: value => (!value || (validator.isLength(value, { max: 8 }) && validator.isAlphanumeric(value)) ? undefined : 'Only 8 letters or numbers allowed'),
  maxLength255: value => (!value || (validator.isLength(value, { max: 255 })) ? undefined : 'Only 255 characters allowed'),
  maxLength2OnlyAlpha: value => (!value || (validator.isLength(value, { max: 2 }) && validator.isAlpha(value)) ? undefined : 'Only 2 letters allowed'),
  date: value => moment(value, 'MM/DD/YYYY', true).isValid() || moment(value, 'YYYY-MM-DD', true).isValid() ? undefined : 'Not a valid date',
  dwellingRange: value => (calculatedValue(value) <= 2000000 && calculatedValue(value) >= 125000) ? undefined : 'Not a valid range.',
  dateCheck: value => (moment(value).isAfter(moment('2017-07-31')) ? undefined : 'Date must be at least 08/01/2017')
};

export function combineRules(validations, variables) {
  const ruleArray = [];

  if (validations) {
    for (let i = 0; i < validations.length; i += 1) {
      if (rules[validations[i]] && ((!variables || (!variables.min && !variables.max)) ||
       (validations[i] === 'dwellingRange') || (validations[i] === 'date') || (validations[i] === 'dateCheck'))) {
        ruleArray.push(rules[`${validations[i]}`]);
      } else if (validations[i] === 'range' && variables && variables.min && variables.max) {
        const range = (values) => {
          const valid = values <= variables.max && values >= variables.min ? undefined : 'Not a valid range';
          return valid;
        };
        ruleArray.push(range);
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
