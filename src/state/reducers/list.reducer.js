import * as persistTypes from 'redux-persist/constants';
import * as types from '../../actions/actionTypes';
import initialState from '../../reducers/initialState';

export default function listReducer(state = initialState.list, action) {
  switch (action.type) {
    case types.SET_AGENTS:
      return handleSetAgents(state, action);
    case types.SET_QUOTE:
      return handleSetQuote(state, action);
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

  return {
    ...state,
    underwritingQuestions: underwritingQuestions,
    uiQuestions: uiQuestionMap,
  }
}
