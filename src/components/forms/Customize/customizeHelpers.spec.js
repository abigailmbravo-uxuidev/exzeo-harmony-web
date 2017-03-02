import { convertQuoteStringsToNumber, getInitialValues } from './customizeHelpers';

describe('customizeHelpers', () => {
  describe('convertQuoteStringsToNumber', () => {
    it('should convert strings to numbers in an object', () => {
      const oldQuote = {
        first: '12',
        second: 'new',
        third: '12new',
        fourth: '0',
        fifth: true
      };
      const newQuote = convertQuoteStringsToNumber(oldQuote);

      expect(newQuote).to.deep.equal({
        first: 12,
        second: 'new',
        third: '12new',
        fourth: 0,
        fifth: true
      });
    });
  });
  describe('getInitializeValues', () => {
    const data = {
      coverageLimits: {
        dwelling: {
          displayText: 'Dwelling',
          amount: 10000000,
          format: 'Currency',
          minAmount: 2000000,
          maxAmount: 2000000,
          _id: '5866c036a46eb72908f3f558'
        },
        otherStructures: {
          displayText: 'Other Structures',
          amount: 1000000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f557'
        },
        ordinanceOrLaw: {
          displayText: 'Ordinance Or Law',
          amount: 1000000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f557'
        },
        personalProperty: {
          displayText: 'Personal Property',
          amount: 500000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f556'
        },
        lossOfUse: {
          displayText: 'Loss of Use',
          amount: 1000000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f555'
        },
        personalLiability: {
          displayText: 'Personal Liability',
          amount: 100000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f554'
        },
        medicalPayments: {
          displayText: 'Medical Payments',
          amount: 2000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f553'
        },
        moldProperty: {
          displayText: 'Mold Property',
          amount: 10000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f552'
        },
        moldLiability: {
          displayText: 'Mold Liability',
          amount: 50000,
          format: 'Currency',
          _id: '5866c036a46eb72908f3f551'
        }
      }
    };
    const questions = [
      {
        name: 'personalPropertyAmount',
        defaultValueLocation: 'coverageLimits.personalProperty.amount',
        question: 'Personal Property Limit',
        answerFormat: 'currency',
        answers: [
          {
            answer: 0,
            label: '0%'
          },
          {
            answer: 25,
            label: '25%'
          },
          {
            answer: 35,
            label: '35%'
          },
          {
            answer: 50,
            label: '50%'
          }
        ],
        conditional: {
          dependency: {
            type: 'percent',
            parent: 'dwellingAmount'
          }
        }
      }, {
        name: 'moldProperty',
        defaultValueLocation: 'coverageLimits.moldLiability.amount',
        question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
        order: 9,
        answerType: 'radio',
        answers: [
          {
            answer: '50000'
          },
          {
            answer: '100000'
          }
        ]
      }, {
        name: 'moldTest',
        defaultValueLocation: 'coverageLimits.moldLiability.amount',
        question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
        order: 9,
        answerType: 'radio',
        answers: [
          {
            answer: 10
          },
          {
            answer: 30
          }
        ],
        conditional: {
          dependency: {
            parent: 'dwelling',
            type: 'percent'
          }
        }
      }, {
        name: 'moldTest2',
        defaultValueLocation: 'coverageLimits.moldLiability.amount',
        question: 'Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property',
        order: 9,
        answerType: 'radio',
        answers: [
          {
            answer: 10
          },
          {
            answer: 30
          }
        ],
        conditional: {
          dependency: {
            parent: 'dwellingAmount',
            type: 'currency'
          }
        }
      }, {
        name: 'dwelling',
        question: 'test',
        readOnlyValue: 500000
      }
    ];
    it('should get initialValues', () => {
      const result = getInitialValues(questions, data);
      expect(result.personalPropertyAmount).to.equal(500000);
      expect(result.dwelling).to.equal(500000);
      expect(result.moldTest).to.equal(10);
      expect(result.moldTest2).to.equal(50000);
    });
  });
});
