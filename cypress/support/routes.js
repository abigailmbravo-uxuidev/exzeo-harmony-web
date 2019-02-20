import { stub } from '../helpers';

export default (useConfig = false) => cy.server()
  .route('POST', '/svc?fetchAddresses', useConfig ? stub('fx:stubs/fetchAddresses') : 'fx:stubs/fetchAddresses')
  .route('POST', '/cg/start?quoteModel', useConfig ? stub('fx:stubs/quoteModel') : 'fx:stubs/quoteModel')
  .route('POST', '/svc?fetchAgency', useConfig ? stub('fx:stubs/fetchAgency') : 'fx:stubs/fetchAgency')
  .route('POST', '/cg/complete?search', useConfig ? stub('fx:stubs/search') : 'fx:stubs/search')
  .route('POST', '/cg/complete?chooseAddress', useConfig ? stub('fx:stubs/chooseAddress') : 'fx:stubs/chooseAddress')
  .route('POST', '/svc?fetchAgentsByAgencyCode', useConfig ? stub('fx:stubs/fetchAgentsByAgencyCode') : 'fx:stubs/fetchAgentsByAgencyCode')
  .route('POST', '/svc?getZipcodeSettings', useConfig ? stub('fx:stubs/getZipcodeSettings') : 'fx:stubs/getZipcodeSettings')
  .route('POST', '/cg/complete?askAdditionalCustomerData', useConfig ? stub('fx:stubs/askAdditionalCustomerData') : 'fx:stubs/askAdditionalCustomerData')
  .route('POST', '/svc?getQuoteServiceRequest', useConfig ? stub('fx:stubs/getQuoteServiceRequest') : 'fx:stubs/getQuoteServiceRequest')
  .route('POST', '/cg/complete?askUWAnswers', useConfig ? stub('fx:stubs/askUWAnswers') : 'fx:stubs/askUWAnswers')
  .route('POST', '/cg/complete?askToCustomizeDefaultQuote', useConfig ? stub('fx:stubs/askToCustomizeDefaultQuote') : 'fx:stubs/askToCustomizeDefaultQuote')
  .route('POST', '/cg/complete?showCustomizedQuoteAndContinue', useConfig ? stub('fx:stubs/showCustomizedQuoteAndContinue') : 'fx:stubs/showCustomizedQuoteAndContinue')
  .route('POST', '/cg/complete?sendEmailOrContinue', useConfig ? stub('fx:stubs/sendEmailOrContinue') : 'fx:stubs/sendEmailOrContinue')
  .route('POST', '/cg/complete?showAssumptions', useConfig ? stub('fx:stubs/showAssumptions') : 'fx:stubs/showAssumptions')
  .route('POST', '/cg/complete?askAdditionalAIs', useConfig ? stub('fx:stubs/askAdditionalAIs') : 'fx:stubs/askAdditionalAIs')
  .route('POST', '/cg/complete?askAdditionalQuestions', useConfig ? stub('fx:stubs/askAdditionalQuestions') : 'fx:stubs/askAdditionalQuestions')
  .route('POST', '/moveToTask?askToCustomizeDefaultQuote', useConfig ? stub('fx:stubs/askToCustomizeDefaultQuote') : 'fx:stubs/askToCustomizeDefaultQuote')
  .route('POST', '/cg/complete?editVerify', useConfig ? stub('fx:stubs/editVerify') : 'fx:stubs/editVerify')
  .route('POST', '/cg/complete?askScheduleInspectionDates', useConfig ? stub('fx:stubs/askScheduleInspectionDates') : 'fx:stubs/askScheduleInspectionDates')


