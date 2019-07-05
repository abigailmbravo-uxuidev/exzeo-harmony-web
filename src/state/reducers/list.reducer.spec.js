import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';
import listReducer from './list.reducer';

describe('List Reducer', () => {
  it('should call list reducer SET AGENTS with no agents', () => {
    const state = initialState.list;
    const action = {
      type: types.SET_AGENTS,
      agents: null
    };

    const result = {
      ...initialState.list,
      agents: []
    };

    expect(listReducer(state, action)).toEqual(result);
  });

  it('should call list reducer SET AGENTS with agents', () => {
    const state = initialState.list;
    const action = {
      type: types.SET_AGENTS,
      agents: [
        {
          firstName: 'Test',
          lastName: 'McTester',
          agentCode: 1000,
          emailAddress: 'test@test.com'
        }
      ]
    };

    const result = {
      ...initialState.list,
      agents: [
        { label: 'Test McTester', answer: 1000, emailAddress: 'test@test.com' }
      ]
    };

    expect(listReducer(state, action)).toEqual(result);
  });

  describe('list reducer SET_BILLING OPTIONS', () => {
    it('should format response from billing action', () => {
      const state = initialState.list;
      const billingOptions = {
        options: [
          {
            billToId: '23412',
            billToType: 'Policyholder',
            displayText: 'Policyholder',
            payPlans: ['Annual', 'Quarterly', 'Semi Annual']
          }
        ],
        paymentPlans: { name: 'Test' }
      };
      const action = {
        type: listTypes.SET_BILLING_OPTIONS,
        billingOptions
      };

      const result = {
        ...initialState.list,
        billingConfig: {
          paymentPlans: billingOptions.paymentPlans,
          billingOptions: [{ label: 'Policyholder', answer: '23412' }],
          billToConfig: {
            '23412': {
              billToType: billingOptions.options[0].billToType,
              availablePlans: billingOptions.options[0].payPlans,
              payPlanOptions: [
                { label: 'Annual', answer: 'Annual' },
                { label: 'Quarterly', answer: 'Quarterly' },
                { label: 'Semi Annual', answer: 'Semi Annual' }
              ]
            }
          }
        }
      };

      expect(listReducer(state, action)).toEqual(result);
    });
  });
});
