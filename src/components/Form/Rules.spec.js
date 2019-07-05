import rules, { combineRules } from './Rules';

describe('Rules', () => {
  describe('required', () => {
    it('should return undefined when value is not undefined', () => {
      expect(rules.required('test')).toBeUndefined();
    });
    it('should return "Field Required" if value is undefined', () => {
      expect(rules.required('')).toEqual('Field Required');
    });
  });
  describe('email', () => {
    it('should return undefined for a valid email', () => {
      expect(rules.email('something@mail.com')).toBeUndefined();
    });
    it('should return "Not a valid email address"', () => {
      expect(rules.email('something')).toEqual('Not a valid email address');
    });
  });
  describe('optionalEmail', () => {
    it('should return undefined for an empty field', () => {
      expect(rules.optionalEmail('')).toBeUndefined();
    });
    it('should return undefined for a valid email', () => {
      expect(rules.optionalEmail('something@mail.com')).toBeUndefined();
    });
    it('should return "Not a valid email address" for invalid email', () => {
      expect(rules.optionalEmail('something')).toEqual(
        'Not a valid email address'
      );
    });
  });
  describe('phone', () => {
    it('should return undefined for a valid phone', () => {
      expect(rules.phone('888-888-8888')).toBeUndefined();
    });
    it('should return "is not a valid Phone Number." on invalid phone', () => {
      expect(rules.phone('-fdsfds')).toEqual('is not a valid Phone Number.');
    });
  });
  describe('isValidDate', () => {
    it('should return undefined for a valid date', () => {
      expect(rules.date('04/27/2017')).toBeUndefined();
    });
    it('should return "is not a valid Date."', () => {
      expect(rules.date('')).toEqual('Not a valid date');
    });
  });

  describe('range', () => {
    it('should return undefined when value is not undefined', () => {
      const ruleArray = combineRules(['range'], { min: 100, max: 20000 });
      expect(ruleArray[0].length).toEqual(1);
    });
  });

  describe('maxLength8AlphaNumeric', () => {
    it('should return undefined', () => {
      expect(rules.maxLength8AlphaNumeric('12345')).toBeUndefined();
    });
    it('should return error', () => {
      expect(rules.maxLength8AlphaNumeric('555%%')).toEqual(
        'Only 8 letters or numbers allowed'
      );
    });
  });

  describe('maxLength255', () => {
    it('should return undefined', () => {
      expect(rules.maxLength255('12345')).toBeUndefined();
    });
    it('should return error', () => {
      expect(
        rules.maxLength255(
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.'
        )
      ).toEqual('Only 255 characters allowed');
    });
  });

  describe('maxLength2OnlyAlpha', () => {
    it('should return undefined', () => {
      expect(rules.maxLength2OnlyAlpha('FL')).toBeUndefined();
    });
    it('should return error', () => {
      expect(rules.maxLength2OnlyAlpha('1')).toEqual('Only 2 letters allowed');
      expect(rules.maxLength2OnlyAlpha('F1')).toEqual('Only 2 letters allowed');
      expect(rules.maxLength2OnlyAlpha('Florida')).toEqual(
        'Only 2 letters allowed'
      );
    });
  });

  describe('minLength3', () => {
    it('should return undefined', () => {
      expect(rules.minLength3('12345')).toBeUndefined();
    });
    it('should return error', () => {
      expect(rules.minLength3('4')).toEqual(
        'Please enter at least 3 characters'
      );
    });
  });

  describe('dateCheck', () => {
    it('should return undefined when date is at least 08/01/2017', () => {
      expect(rules.dateCheck('2017-08-01')).toBeUndefined();
    });
    it('should return error when date is less than 08/01/2017', () => {
      expect(rules.dateCheck('2017-07-31')).toEqual(
        'Date must be at least 08/01/2017'
      );
    });
  });
});
