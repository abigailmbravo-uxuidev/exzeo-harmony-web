import { toCurrency } from '../../helpers';

export const slidersHO3 = [
  {
    path: 'coverageLimits.dwelling.value', value: '300000', defaultValue: '314000',
    callback: res => cy.findDataTag('coverageLimits.dwelling.amountDetail').should('contain', toCurrency(res.body.result.coverageLimits.dwelling.amount))
      .findDataTag('coverageLimits.dwelling.value-input').should('have.value', toCurrency(res.body.result.coverageLimits.dwelling.amount))
  }
];

export const customizeRadiosHO3 = [
  { name: 'coverageLimits.otherStructures.value', defaultValue: '2', testValue: '0' }
];
