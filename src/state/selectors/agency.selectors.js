import { createSelector } from 'reselect';
import { PRODUCT_NAMES } from 'components/Search/constants';

const getAgency = state => state.agencyState.agency;
const getProduct = (state, product) => product;

export const getStatesByContracts = createSelector(
  [getAgency, getProduct],
  (agency, product) => {
    const states = [];
    if (!agency || !product) return states;
    agency.contracts.forEach(c => {
      c.stateProducts.forEach(s => {
        if (s.product === product && !states.some(p => p.answer === s.state)) {
          states.push({ answer: s.state, label: s.state });
        }
      });
    });
    return states;
  }
);

export const getProductsByContracts = createSelector([getAgency], agency => {
  const products = [];
  if (!agency) return products;
  agency.contracts.forEach(c => {
    c.stateProducts.forEach(s => {
      if (!products.some(p => p.answer === s.product)) {
        products.push({ answer: s.product, label: PRODUCT_NAMES[s.product] });
      }
    });
  });
  return products;
});
