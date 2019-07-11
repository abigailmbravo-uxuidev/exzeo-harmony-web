export const fatalUnderwritingException = {
  code: '108',
  displayText: 'underwritingAnswers.rented = Yes',
  category: 'Underwriting Answers',
  action: 'Fatal Error',
  agentMessage: 'Homes that are rented are not eligible for this program.',
  internalMessage: 'Homes that are rented are not eligible for this program.',
  active: true
};

export const reviewUnderwritingExcception = {
  code: '208',
  displayText: 'underwritingAnswers.previousClaims = 3-5 Years',
  category: 'Underwriting Answers',
  action: 'Underwriting Review',
  agentMessage:
    'This quote sucks. Due to previous claims history, underwriting review is required prior to binding.',
  internalMessage:
    'This quote sucks. Due to previous claims history, underwriting review is required prior to binding.',
  active: true
};
