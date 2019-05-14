import { toCurrency } from '../../helpers';

export const slidersAF3 = [
  {
    path: 'coverageLimits.building.value', value: '330000', defaultValue: '314000',
    callback: res => cy.findDataTag('coverageLimits.building.amountDetail').find('dd').eq(0).should('contain', toCurrency(res.body.result.coverageLimits.building.amount))
      .findDataTag('coverageLimits.building.value-input').should('have.value', toCurrency(res.body.result.coverageLimits.building.amount))
  },
  { path: 'coverageLimits.personalProperty.value', value: '0' },
  { path: 'coverageLimits.personalProperty.value', value: '140000', defaultValue: '79000' }
];

export const customizeRadiosAF3 = [
  { name: 'deductibles.buildingDeductible.value', defaultValue: '500', testValue: '1000' }
];
