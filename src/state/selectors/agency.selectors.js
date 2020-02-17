import { createSelector } from 'reselect';

const getAgency = state => state.agencyState.agency;
const fieldValues = (state, values) => values;

export const getParamsByContracts = createSelector(
  [getAgency, fieldValues],
  (agency, values) => {
    const states = [];
    if (!agency || !values) return states;
    agency.contracts.forEach(c => {
      c.stateProducts.map(s => {
        if (
          s.product === values.product &&
          !states.some(p => p.answer === s.state)
        ) {
          states.push({ answer: s.state, label: s.state });
        }
        return s;
      });
    });
    return states;
  }
);
