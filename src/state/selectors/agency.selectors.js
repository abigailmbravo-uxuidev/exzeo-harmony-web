import { createSelector } from 'reselect';

const getAgency = state => state.agencyState.agency;

export const getParamsByContracts = createSelector(
  [getAgency],
  agency => {
    const states = [];
    if (!agency) return states;
    agency.contracts.forEach(c => {
      c.stateProducts.map(s => {
        if (!states.some(p => p.answer === s.state)) {
          states.push({ answer: s.state, label: s.state });
        }
        return s;
      });
    });
    return states;
  }
);
