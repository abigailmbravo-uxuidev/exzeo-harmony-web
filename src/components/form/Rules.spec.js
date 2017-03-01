import React from 'react';
import { shallow } from 'enzyme';
import { combineRules } from './Rules';
import rules from './Rules';

describe('Rules', () => {
  it('should render rules', () => {
    const result = combineRules(['required', 'email', 'optionalEmail', 'phone', 'date']);
    expect(result.length).to.equal(5);
  });

  it('should check rules', () => {
    expect(rules.required).to.exist;
    expect(rules.email).to.exist;
    expect(rules.phone).to.exist;
    expect(rules.optionalEmail).to.exist;
    expect(rules.date).to.exist;
  });

  it('should check rules for valid rules', () => {
    expect(rules.required('value')).to.equal(undefined);
    expect(rules.email('gmail@gmail.com')).to.equal(undefined);
    expect(rules.phone('1234567890')).to.equal(undefined);
    expect(rules.optionalEmail(null)).to.equal(undefined);
    expect(rules.optionalEmail('gmail@gmail.com')).to.equal(undefined);
    expect(rules.date('08-12-2000')).to.equal(undefined);
  });

  it('should validate bad results', () => {
    expect(rules.required(null)).to.equal('Field Required');
    expect(rules.email('gmailgmail.com')).to.equal('Not a valid email address');
    expect(rules.phone('3456')).to.equal('is not a valid Phone Number.');
    expect(rules.optionalEmail('gmailgmail')).to.equal('Not a valid email address');
    expect(rules.date('abc')).to.equal('is not a valid Date.');
  });
});
