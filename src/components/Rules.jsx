import validator from 'validator';


const rules = {
  required: value => value ? undefined : 'Field Required',
  email: value => validator.isEmail(value) ? undefined : 'Not a valid email address',
  optionalEmail: value => (!value || validator.isEmail(value)) ? undefined : 'Not a valid email address',
  phone: value => value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g) ? undefined : 'is not a valid Phone Number.',
  date: value => validator.isDate(value) ? value : 'is not a valid Date.',
};

export function combineRules(validations) {
  const ruleArray = [];

  if (validations) {
    for (let i = 0; i < validations.length; i += 1) {
      ruleArray.push(rules[`${validations[i]}`]);
    }
  }
  return ruleArray;
}

export default rules;
