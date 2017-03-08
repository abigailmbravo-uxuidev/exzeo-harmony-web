import rules from './Rules';

describe('Rules', () => {
  describe('required', () => {
    it('should return undefined when value is not undefined', () => {
      expect(rules.required('test')).to.be.undefined;
    });
    it('should return "Field Required" if value is undefined', () => {
      expect(rules.required('')).to.equal('Field Required');
    });
  });
  describe('email', () => {
    it('should return undefined for a valid email', () => {
      expect(rules.email('something@mail.com')).to.be.undefined;
    });
    it('should return "Not a valid email address"', () => {
      expect(rules.email('something')).to.equal('Not a valid email address');
    });
  });
  describe('optionalEmail', () => {
    it('should return undefined for an empty field', () => {
      expect(rules.optionalEmail('')).to.be.undefined;
    });
    it('should return undefined for a valid email', () => {
      expect(rules.optionalEmail('something@mail.com')).to.be.undefined;
    });
    it('should return "Not a valid email address" for invalid email', () => {
      expect(rules.optionalEmail('something')).to.equal('Not a valid email address');
    });
  });
  describe('phone', () => {
    it('should return undefined for a valid phone', () => {
      expect(rules.phone('888-888-8888')).to.be.undefined;
    });
    it('should return "is not a valid Phone Number." on invalid phone', () => {
      expect(rules.phone('')).to.equal('is not a valid Phone Number.');
    });
  });
  describe('date', () => {
    it('should return undefined for a valid date', () => {
      expect(rules.date('10/10/10')).to.be.undefined;
    });
    it('should return "is not a valid Date."', () => {
      expect(rules.date('')).to.equal('is not a valid Date.');
    });
  });
});
