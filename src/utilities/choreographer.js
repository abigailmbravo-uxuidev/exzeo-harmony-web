import axios from 'axios';

import { callService, handleError } from './serviceRunner';
import { formattedDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

const HARD_STOP_STEPS = [
  'UWDecision1EndError',
  'UWDecision2EndError',
  'UWDecision3EndError',
  'UWDecision4EndError',
  'UWDecision5EndError'
];

const state = {
  activeTask: '',
  variables: [],
  workflowId: '',
  completedTasks: [],
  underwritingExceptions: [],
  uiQuestions: [],
  underwritingQuestions: [],
  isHardStop: false
};

/**
 * Get current state object
 * @private
 * @returns {{activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array, isHardStop: boolean}}
 */
function getState() {
  return state;
}

/**
 * Set values from cg response onto 'quoteState' object
 * @param activeTask
 * @param workflowId
 * @param variables
 * @param completedTasks
 * @param underwritingReviewErrors
 * @param uiQuestions
 * @param underwritingQuestions
 * @param isHardStop
 * @private
 */
function setState({
  activeTask = '',
  workflowId = '',
  variables = [],
  completedTasks = [],
  underwritingExceptions = [],
  uiQuestions = [],
  underwritingQuestions = [],
  isHardStop = false
}) {
  state.activeTask = activeTask;
  state.variables = variables;
  state.workflowId = workflowId;
  state.completedTasks = completedTasks;
  state.underwritingExceptions = underwritingExceptions;
  state.uiQuestions = uiQuestions;
  state.underwritingQuestions = underwritingQuestions;
  state.isHardStop = isHardStop;
}

function formatForCGStep(activeTask, data, options) {
  if ((options || {}).cgEndpoint === 'moveToTask') return {};

  const taskData = {};
  if(activeTask === 'askAdditionalCustomerData'){
    const { timezone } = options;

    taskData.agentCode = String(data.agentCode);

    taskData.FirstName = data.policyHolders[0].firstName;
    taskData.LastName = data.policyHolders[0].lastName;
    taskData.EmailAddress = data.policyHolders[0].emailAddress;
    taskData.phoneNumber = data.policyHolders[0].primaryPhoneNumber;
    taskData.electronicDelivery = data.policyHolders[0].electronicDelivery || false;
    taskData.effectiveDate = formattedDate(data.effectiveDate, FORMATS.SECONDARY, timezone);

    if (data.additionalPolicyholder) {
      taskData.FirstName2 = data.policyHolders[1].firstName;
      taskData.LastName2 = data.policyHolders[1].lastName;
      taskData.EmailAddress2 = data.policyHolders[1].emailAddress;
      taskData.phoneNumber2 = data.policyHolders[1].primaryPhoneNumber;

    }
    return taskData;
  }
  else if (activeTask === 'askUWAnswers') {
    ((options.underwritingQuestions || []).filter(u => !!u.hidden)).map(uwAnswers => {
      taskData[uwAnswers.name] = uwAnswers.defaultValue;
    });

    Object.keys(data.underwritingAnswers).map(uw => {
      if(data.underwritingAnswers[uw].answer){
       taskData[uw] = data.underwritingAnswers[uw].answer;
      }
       return uw;
    });
    return taskData;

  }
  else if (activeTask === 'customizeDefaultQuote') {
    /* (data, quoteNumber, activeTask, options) */

    /* const updatedQuote = convertQuoteStringsToNumber(data); */
    //hidden fields on the form
    taskData.recalc = data.recalc;
    taskData.propertyIncidentalOccupancies = "None";

    taskData.dwellingAmount = Number(data.coverageLimits.dwelling.amount);
    taskData.otherStructuresAmount = Math.ceil(((data.coverageLimits.otherStructures.value / 100) * data.coverageLimits.dwelling.amount));
    const personalPropertyAmount = Math.ceil(((data.coverageLimits.personalProperty.value / 100) * data.coverageLimits.dwelling.amount));
    taskData.personalPropertyAmount = personalPropertyAmount;
    taskData.personalPropertyReplacementCostCoverage = personalPropertyAmount
      ? (data.coverageOptions.personalPropertyReplacementCost.answer || false)
      : false;
    taskData.lossOfUseAmount = data.coverageLimits.lossOfUse.value;
    taskData.lossOfUse = Math.ceil(((data.coverageLimits.lossOfUse.value / 100) * data.coverageLimits.dwelling.amount));
    taskData.personalLiability = data.coverageLimits.personalLiability.amount;
    taskData.medicalPayments = data.coverageLimits.medicalPayments.amount;
    taskData.moldProperty = data.coverageLimits.moldProperty.amount;
    taskData.moldLiability = data.coverageLimits.moldLiability.amount;
    taskData.ordinanceOrLaw = data.coverageLimits.ordinanceOrLaw.amount;
    // taskData.ordinanceOrLaw = Math.ceil(((data.coverageLimits.ordinanceOrLaw.amount / 100) * data.coverageLimits.dwelling.amount));
    taskData.sinkholePerilCoverage = data.coverageOptions.sinkholePerilCoverage.answer;
    taskData.sinkhole =  data.coverageOptions.sinkholePerilCoverage.answer ? 10: 0;
    taskData.allOtherPerils = data.deductibles.allOtherPerils.answer;
    taskData.hurricane = data.deductibles.hurricane.amount;
    taskData.calculatedHurricane = Math.ceil(((data.deductibles.hurricane.amount / 100.0) * data.coverageLimits.dwelling.amount));
    taskData.propertyIncidentalOccupanciesMainDwelling = data.coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer;
    taskData.propertyIncidentalOccupanciesOtherStructures = data.coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer;
    taskData.allOtherPerils = data.deductibles.allOtherPerils.amount;
    taskData.liabilityIncidentalOccupancies = data.coverageOptions.liabilityIncidentalOccupancies.answer;

    return {
      ...taskData,
      ...data.property.windMitigation,
      ...data.property,
    }
  }
  else if (activeTask === 'showAssumptions') {
    // do nothing I believe
  }
  else if (activeTask === 'askAdditionalQuestions') {
    taskData.billToId = data.billToId;
    taskData.billToType = data.billToType;
    taskData.billPlan = data.billPlan;

    return {
      ...taskData,
      ...data.policyHolderMailingAddress,
    }
  }

  return data;
}

/**
 * Start cg model instance
 * @param modelName
 * @param data
 * @private
 * @returns {Promise<void>}
 */
async function start(modelName, data) {
  const axiosConfig = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      modelName,
      data
    }
  };

  const response = await axios(axiosConfig);

  const { data: { activeTask: { name: activeTaskName }, modelInstanceId, model: { variables, completedTasks } } } = response.data;
  setState({
    activeTask: activeTaskName,
    workflowId: modelInstanceId,
    variables,
    completedTasks
  });
}

/**
 * Complete cg step
 * @param stepName
 * @param data
 * @param cgEndpoint
 * @param [options]
 * @private
 * @returns {Promise<void>}
 */
async function complete(stepName = '', data = {}, options = {}) {
  const quoteData = formatForCGStep(stepName, data, options);
  const axiosConfig = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/cg/${options.cgEndpoint || 'complete'}?${stepName}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
      workflowId: state.workflowId,
      stepName,
      data: quoteData
    }
  };

  try {
    // deeply nested response object from cg/axios
    const response = await axios(axiosConfig);

    const {
      data: {
        uiQuestions,
        previousTask = {},
        activeTask = {},
        modelInstanceId,
        model: {
          variables,
          completedTasks
        }
      }
    } = response.data;

    let underwritingExceptions = [];
    const isHardStop = HARD_STOP_STEPS.includes(previousTask.name);
    const cgUWQuestions = variables.find(v => v.name === 'getListOfUWQuestions');
    const underwritingQuestions = cgUWQuestions ? cgUWQuestions.value.result : [];

    if (previousTask.name === 'UnderWritingReviewError' || isHardStop) {
      underwritingExceptions = previousTask.value.filter(uwe => !uwe.overridden);
    }

    setState({
      activeTask: activeTask.name,
      workflowId: modelInstanceId,
      variables,
      completedTasks,
      underwritingExceptions,
      uiQuestions,
      underwritingQuestions,
      isHardStop
    });
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Find data in cg response 'variables' property by name
 * @param name
 * @private
 * @returns {*|null}
 */
function getDataByName(name) {
  const result = state.variables.find(v => v.name === name);
  return result && result.value && result.value.result ? result.value.result : null;
}

/**
 * Get quote directly through service-runner
 * @private
 * @param {string} quoteNumber
 * @returns {Promise<*>}
 */
async function getQuoteServiceRequest(quoteNumber) {
  try {
    const response = await callService({
      service: 'quote-data',
      method: 'GET',
      path: quoteNumber
    }, 'getQuoteServiceRequest');

    return response.data.result;
  } catch (error) {
    throw handleError(error);
  }
}

/**
 * Create/start a quote through CG
 * @param address
 * @param igdID
 * @param stateCode
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array}}>}
 */
async function createQuote(address, igdID, stateCode) {
  await start('quoteModel', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });

  await complete('search', { address, searchType: 'address' });
  await complete('chooseAddress', { igdId: igdID, stateCode });

  return {
    quote: getDataByName('createQuote'),
    state: getState()
  };
}

/**
 * Retrieve existing quote through CG and start new model instance
 * @param quoteNumber
 * @param quoteId
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array}}>}
 */
async function getQuote(quoteNumber, quoteId) {
  await start('quoteModel', { dsUrl: `${process.env.REACT_APP_API_URL}/ds` });

  await complete('search', { quoteNumber, searchType: 'quote' });
  await complete('chooseQuote', { quoteId });
  return {
    quote: getDataByName('retrieveQuote'),
    state: getState()
  };
}

/**
 * Update quote and quoteState object
 * @param data
 * @param quoteNumber
 * @param stepName
 * @param getReduxState
 * @param [options]
 * @public
 * @returns {Promise<{quote: *, state: {activeTask: string, variables: Array, workflowId: string, completedTasks: Array, underwritingExceptions: Array, uiQuestions: Array, underwritingQuestions: Array, isHardStop: boolean}}>}
 */
async function updateQuote({ data, quoteNumber, stepName, getReduxState, options }) {
  // if user refreshes it will ensure the state is synced up to the redux state;
  if (!state.activeTask) setState(getReduxState().quoteState.state);

  // 'moveToTask' for going back to specific step in workflow
  if (stepName) {
    await complete(stepName, {}, { cgEndpoint: 'moveToTask' });
  }
  else if (!stepName) {
    if (state.activeTask === 'askToCustomizeDefaultQuote' && data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'Yes' }, options);
      await complete(state.activeTask, data, options);
      // customize and save
    } else if (state.activeTask === 'askToCustomizeDefaultQuote' && !data.recalc) {
      await complete(state.activeTask, { shouldCustomizeQuote: 'No' }, options);
      // share
    } else if (state.activeTask === 'sendEmailOrContinue' && data.shouldSendEmail === 'Yes') {
      await complete(state.activeTask, { shouldSendEmail: 'Yes' }, options);
      await complete(state.activeTask, data, options);
      // verify
    } else if (state.activeTask === 'editVerify') {
      await complete(state.activeTask, { shouldEditVerify: data.shouldEditVerify }, options);
      await complete(state.activeTask, data, options);
      // all other steps
    } else {
      await complete(state.activeTask, data, options);
    }

    // if we land on this step, need to fire another complete
    if (state.activeTask === 'showCustomizedQuoteAndContinue') {
      await complete(state.activeTask, {}, options);
    }
  }

  const quote = await getQuoteServiceRequest(quoteNumber);

  return {
    quote,
    state: getState()
  };
}


export default {
  createQuote,
  getQuote,
  updateQuote
};

