import { stub } from '../helpers';


export default (useConfig = false) => cy.server()
  .route('POST', '/svc?fetchAgency', useConfig ? stub('fx:stubs/fetchAgency') : 'fx:stubs/fetchAgency').as('fetchAgency')
  .route('POST', '/svc?fetchAddresses', useConfig ? stub('fx:stubs/fetchAddresses') : 'fx:stubs/fetchAddresses').as('fetchAddresses')
  .route('POST', '/cg/start?quoteModel', useConfig ? stub('fx:stubs/start/quoteModel') : 'fx:stubs/start/quoteModel')
  .route('POST', '/svc?getQuoteServiceRequest', useConfig ? stub('fx:stubs/getQuoteServiceRequest') : 'fx:stubs/getQuoteServiceRequest').as('getQuoteServiceRequest')
  .route('POST', '/cg/complete?search', useConfig ? stub('fx:stubs/complete/search') : 'fx:stubs/complete/search')
  .route('POST', '/cg/complete?chooseAddress', useConfig ? stub('fx:stubs/complete/chooseAddress') : 'fx:stubs/complete/chooseAddress')
  .route('POST', '/svc?fetchAgentsByAgencyCode', useConfig ? stub('fx:stubs/fetchAgentsByAgencyCode') : 'fx:stubs/fetchAgentsByAgencyCode')
  .route('POST', '/svc?getZipcodeSettings', useConfig ? stub('fx:stubs/getZipcodeSettings') : 'fx:stubs/getZipcodeSettings').as('getZipcodeSettings')
  .route('POST', '/cg/complete?askAdditionalCustomerData', useConfig ? stub('fx:stubs/complete/askAdditionalCustomerData') : 'fx:stubs/complete/askAdditionalCustomerData')
  .route('POST', '/cg/moveToTask?askAdditionalCustomerData', useConfig ? stub('fx:stubs/moveToTask/askAdditionalCustomerData') : 'fx:stubs/moveToTask/askAdditionalCustomerData')
  .route('POST', '/cg/complete?askUWAnswers', useConfig ? stub('fx:stubs/complete/askUWAnswers') : 'fx:stubs/complete/askUWAnswers')
  .route('POST', '/cg/moveToTask?askUWAnswers', useConfig ? stub('fx:stubs/moveToTask/askUWAnswers') : 'fx:stubs/moveToTask/askUWAnswers')
  .route('POST', '/cg/complete?askToCustomizeDefaultQuote', useConfig ? stub('fx:stubs/complete/askToCustomizeDefaultQuote') : 'fx:stubs/complete/askToCustomizeDefaultQuote')
  .route('POST', '/cg/moveToTask?askToCustomizeDefaultQuote', useConfig ? stub('fx:stubs/moveToTask/askToCustomizeDefaultQuote') : 'fx:stubs/moveToTask/askToCustomizeDefaultQuote')
  .route('POST', '/cg/complete?showCustomizedQuoteAndContinue', useConfig ? stub('fx:stubs/complete/showCustomizedQuoteAndContinue') : 'fx:stubs/complete/showCustomizedQuoteAndContinue')
  .route('POST', '/cg/complete?sendEmailOrContinue', useConfig ? stub('fx:stubs/complete/sendEmailOrContinue') : 'fx:stubs/complete/sendEmailOrContinue')
  .route('POST', '/cg/moveToTask?sendEmailOrContinue', useConfig ? stub('fx:stubs/moveToTask/sendEmailOrContinue') : 'fx:stubs/moveToTask/sendEmailOrContinue')
  .route('POST', '/cg/complete?showAssumptions', useConfig ? stub('fx:stubs/complete/showAssumptions') : 'fx:stubs/complete/showAssumptions')
  .route('POST', '/cg/complete?addAdditionalAIs', useConfig ? stub('fx:stubs/complete/addAdditionalAIs') : 'fx:stubs/complete/addAdditionalAIs')
  .route('POST', '/cg/moveToTask?addAdditionalAIs', useConfig ? stub('fx:stubs/moveToTask/addAdditionalAIs') : 'fx:stubs/moveToTask/addAdditionalAIs')
  .route('POST', '/cg/complete?askAdditionalQuestions', useConfig ? stub('fx:stubs/complete/askAdditionalQuestions') : 'fx:stubs/complete/askAdditionalQuestions')
  .route('POST', '/cg/moveToTask?askAdditionalQuestions', useConfig ? stub('fx:stubs/moveToTask/askAdditionalQuestions') : 'fx:stubs/moveToTask/askAdditionalQuestions')
  .route('POST', '/cg/complete?editVerify', useConfig ? stub('fx:stubs/complete/editVerify') : 'fx:stubs/complete/editVerify')
  .route('POST', '/cg/moveToTask?editVerify', useConfig ? stub('fx:stubs/moveToTask/editVerify') : 'fx:stubs/moveToTask/editVerify')
  .route('POST', '/cg/complete?askScheduleInspectionDates', useConfig ? stub('fx:stubs/complete/askScheduleInspectionDates') : 'fx:stubs/complete/askScheduleInspectionDates')
  .route('POST', '/cg/complete?askMortgagee', useConfig ? stub('fx:stubs/complete/askMortgagee') : 'fx:stubs/complete/askMortgagee');