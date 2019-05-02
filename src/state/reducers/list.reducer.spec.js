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
      agents: [],
    };

    expect(listReducer(state, action)).toEqual(result);
  });

  it('should call list reducer SET AGENTS with agents', () => {
    const state = initialState.list;
    const action = {
      type: types.SET_AGENTS,
      agents: [
        { firstName: 'Test', lastName: 'McTester', agentCode: 1000, emailAddress: 'test@test.com' }
      ]
    };

    const result = {
      ...initialState.list,
      agents: [
        { label: 'Test McTester', answer: 1000, emailAddress: 'test@test.com'}],
    };

    expect(listReducer(state, action)).toEqual(result);
  });

  describe('list reducer SET_BILLING OPTIONS' , () => {
    it('should set billToId when only one option is present', () => {
      const state = initialState.list;
      const billingOptions = {
        options: [{
          billToId: '23412',
          billToType: 'Policyholder',
          displayText: 'Policyholder',
          payPlans: [
            'Annual',
            'Quarterly',
            'Semi Annual'
          ]
        }],
        paymentPlans: { name: 'Test' }
      };
      const action = {
        type: listTypes.SET_BILLING_OPTIONS,
        billingOptions,
        quote: {
          billToId: ''
        }
      };

      const result = {
        ...initialState.list,
        billingConfig: {
          billingOptions: [{label: 'Policyholder', answer: '23412'}],
          billToConfig: {
            '23412': {
              billToType: billingOptions.options[0].billToType,
              availablePlans: billingOptions.options[0].payPlans,
              payPlanOptions: [
                { label: 'Annual', answer: 'Annual' },
                { label: 'Quarterly', answer: 'Quarterly' },
                { label: 'Semi Annual', answer: 'Semi Annual' },
              ]
            }
          },
          defaultBillToId: billingOptions.options[0].billToId,
          paymentPlans: billingOptions.paymentPlans,
        },
      };

      expect(listReducer(state, action)).toEqual(result);
    });

    it('should set billToId when more than one option is present and there is no quote.billToId', () => {
      const state = initialState.list;
      const billingOptions = {
        options: [
          {
            billToId: '23412',
            billToType: 'Policyholder',
            displayText: 'Policyholder',
            payPlans: [
              'Annual',
              'Quarterly',
              'Semi Annual'
            ]
          },
          {
            billToId: '3465234',
            billToType: 'Mortgagee',
            displayText: 'Mortgagee',
            payPlans: [
              'Annual',
            ]
          }
          ],
        paymentPlans: { name: 'Test' }
      };
      const action = {
        type: listTypes.SET_BILLING_OPTIONS,
        billingOptions,
        quote: {
          billToId: ''
        }
      };

      const result = {
        ...initialState.list,
        billingConfig: {
          billingOptions: [{label: 'Policyholder', answer: '23412'}, {label: 'Mortgagee', answer: '3465234'}],
          billToConfig: {
            '23412': {
              billToType: billingOptions.options[0].billToType,
              availablePlans: billingOptions.options[0].payPlans,
              payPlanOptions: [
                { label: 'Annual', answer: 'Annual' },
                { label: 'Quarterly', answer: 'Quarterly' },
                { label: 'Semi Annual', answer: 'Semi Annual' },
              ]
            },
            '3465234': {
              billToType: billingOptions.options[1].billToType,
              availablePlans: billingOptions.options[1].payPlans,
              payPlanOptions: [
                { label: 'Annual', answer: 'Annual' },
              ]
            }
          },
          defaultBillToId: "",
          paymentPlans: billingOptions.paymentPlans,
        },
      };

      expect(listReducer(state, action)).toEqual(result);
    });
  });
});
