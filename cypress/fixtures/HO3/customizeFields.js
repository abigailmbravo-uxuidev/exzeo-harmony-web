import { toCurrency } from '../../helpers';

export const sliders = [
  {
    path: 'coverageLimits.dwelling.value',
    value: '284000',
    defaultValue: '314000',
    callback: res =>
      cy
        .findDataTag('coverageLimits.dwelling.amountDetail')
        .should(
          'contain',
          toCurrency(res.body.result.coverageLimits.dwelling.amount)
        )
        .findDataTag('coverageLimits.dwelling.value-input')
        .should(
          'have.value',
          toCurrency(res.body.result.coverageLimits.dwelling.amount)
        )
  }
];

export const customizeRadios = [
  {
    name: 'coverageLimits.otherStructures.value',
    defaultValue: '2',
    testValue: '0'
  }
];
