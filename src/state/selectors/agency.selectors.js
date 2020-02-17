import { createSelector } from 'reselect';

const getAgency = state => state.agencyState.agency;
const getProduct = (state, product) => product;

export const getParamsByContracts = createSelector(
  [getAgency, getProduct],
  (agency, product) => {
    const states = [];
    if (!agency || !product) return states;
    agency.contracts.forEach(c => {
      c.stateProducts.map(s => {
        if (s.product === product && !states.some(p => p.answer === s.state)) {
          states.push({ answer: s.state, label: s.state });
        }
        return s;
      });
    });
    return states;
  }
);
