import * as persistTypes from 'redux-persist/constants';
import * as types from '../../actions/actionTypes';
import * as listTypes from '../actionTypes/list.actionTypes';
import initialState from '../../reducers/initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return handleSetAgents(state, action);
    case types.SET_QUOTE:
      return handleSetQuote(state, action);
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

function getBillingInfo(state) {
  const billingVar = state.variables.find(v => v.name === 'billingOptions');
  if (!billingVar) return { billingOptions: [], billPlans: {}, billToConfig: {} };

  return {
    // build billing options array for 'select' field
    billingOptions: billingVar.value.result.options.map(o => ({ label: o.displayText, answer: o.billToId })),
    //
    paymentPlans: billingVar.value.result.paymentPlans,
    billToConfig: billingVar.value.result.options.reduce((map, option) => {
      return {
        ...map,
        [option.billToId]: {
          billToType:option.billToType,
          availablePlans: option.payPlans,
          payPlanOptions: option.payPlans.map(p => ({ label: p, answer: p })),
        }
      }
    }, {})
  }
}

function handleSetQuote(state, action) {
  // WE could put these in a selector but this doesn't get run often and will probably change a lot when 'workflow' is implemented
  const underwritingQuestions = action.state.underwritingQuestions
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

  const uiQuestionMap = action.state.uiQuestions.reduce((map, question) => {
    return {
      ...map,
      [question.name]: (question.answers || []).map(answer => ({
        answer: answer.answer,
        label: answer.label,
      }))
    }
  }, {});

  const billingData = getBillingInfo(action.state);

  return {
    ...state,
    underwritingQuestions: underwritingQuestions,
    uiQuestions: uiQuestionMap,
    billingOptions: billingData.billingOptions,
    paymentPlans: billingData.paymentPlans,
    billToConfig: billingData.billToConfig,
  }
}

function handleSetZipCodeSettings(state, action) {

  return {
    ...state,
    zipCodeSettings: action.zipCodeSettings,
  }
}
