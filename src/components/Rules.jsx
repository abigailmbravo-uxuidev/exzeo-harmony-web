import validator from 'validator';

const rules = {};
// Use Object.assign or any similar API to merge a rules
// NOTE: IE10 doesn't have Object.assign API natively. Use polyfill/babel plugin.
Object.assign(rules, {
    // Key name maps the rule
  required: value => value ? undefined : 'Field Required',
  email: value => validator.isEmail(value) ? undefined : 'Not a valid email address',
  phone: value => value.match(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g) ? undefined : 'is not a valid Phone Number.',
  date: value => validator.isDate(value) ? value : 'is not a valid Date.',
});

export default rules;
