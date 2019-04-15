import * as persistTypes from 'redux-persist/constants';
import * as types from '../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return handleSetAgents(state, action);
    // case types.SET_QUOTE:
    //   return handleSetQuote(state, action);
    case listTypes.SET_ZIP_SETTINGS:
      return handleSetZipCodeSettings(state, action);
    case persistTypes.REHYDRATE:
      return (action.payload && action.payload.list) ? action.payload.list : initialState.list;
    default:
      return state;
  }
}

function handleSetAgents(state, action) {
  const agents = Array.isArray(action.agents)
    ? action.agents.map(o => ({
        label: `${o.firstName} ${o.lastName}`,
        answer: o.agentCode
      }))

    : [];
  return {
    ...state,
    agents,
  };
}

function getBillingInfo(state = {}, quote = {}) {
  const billingVar = (state.variables || []).find(v => v.name === 'billingOptions');
  if (!billingVar) return undefined;

  const { result = {} } = billingVar.value;
  const { options = [], paymentPlans = {} } = result;
  // check if the currently selected billToId is still an available option (should reset the value if not)
  const billToIdIsValid = options.find(o => o.billToId === quote.billToId);

  let defaultBillToId = '';
  if (billToIdIsValid) {
    defaultBillToId = quote.billToId;
  }
  // if there is only one option from the server, we want that option preselected on the page
  else if (options.length === 1) {
    // when 'Premium Finance' OR 'Bill Payer' OR 'Policyholder' is the only option
    defaultBillToId = options[0].billToId
  }

  const billingOptions = [];
  const billToConfig = {};

  options.forEach(option => {
    billingOptions.push(({ label: option.displayText, answer: option.billToId }));
    billToConfig[`${option.billToId}`] = {
      billToType:option.billToType,
      availablePlans: option.payPlans,
      payPlanOptions: option.payPlans.map(p => ({ label: p, answer: p })),
    }
  });

  return {
    billingOptions,
    billToConfig,
    defaultBillToId,
    paymentPlans,
  }
}

function handleSetQuote(state, action) {
  // WE could put these in a selector but this doesn't get run often and will probably change a lot when 'workflow' is implemented
  const underwritingQuestions = (action.state.underwritingQuestions || [])
    .sort((a, b) => a.order - b.order)
    .map(question => {
      const defaultValue = (question.answers || []).find(answer => answer.default);
      return ({
        name: question.name,
        hidden: question.hidden,
        label: question.question,
        defaultValue: defaultValue ? defaultValue.answer : '',
        validation: ['isRequired'],
        options: (question.answers || []).map(answer => ({
          answer: answer.answer,
          label: answer.answer,
        }))
      })
    });

  const uiQuestionMap = (action.state.uiQuestions || []).reduce((map, question) => {
    return {
      ...map,
      [question.name]: (question.answers || []).map(answer => ({
        answer: answer.answer,
        label: answer.label,
      }))
    }
  }, {});

  const billingData = getBillingInfo(action.state, action.quote);

  return {
    ...state,
    underwritingQuestions: underwritingQuestions,
    uiQuestions: uiQuestionMap,
    billingConfig: billingData || initialState.list.billingConfig,
  }
}

function handleSetZipCodeSettings(state, action) {

  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings,
  }
}
