import { cspConfigForSearch } from './userResources';
import { userProfile } from '../test-utils/fixtures';

describe('Test cspOptions', () => {
  it('Does the right thing!', () => {
    const {
      companyCodeMap,
      stateOptions,
      productOptions,
      productOptionMap
    } = cspConfigForSearch(userProfile, 'QuoteData:Quotes:*');

    expect(companyCodeMap).toEqual({
      'FL:HO3': 'TTIC',
      'FL:AF3': 'TTIC',
      'NJ:AF3': 'HCPC',
      'SC:AF3': 'HCPC'
    });

    expect(stateOptions).toEqual([
      {
        answer: 'FL',
        label: 'FL'
      },
      {
        answer: 'NJ',
        label: 'NJ'
      },
      {
        answer: 'SC',
        label: 'SC'
      }
    ]);

    expect(productOptions).toEqual([
      { answer: 'HO3', label: 'HO3' },
      { answer: 'AF3', label: 'Flood' }
    ]);

    expect(productOptionMap).toEqual({
      FL: [
        {
          answer: 'HO3',
          label: 'HO3'
        },
        {
          answer: 'AF3',
          label: 'Flood'
        }
      ],
      NJ: [
        {
          answer: 'AF3',
          label: 'Flood'
        }
      ],
      SC: [
        {
          answer: 'AF3',
          label: 'Flood'
        }
      ]
    });
  });
});
