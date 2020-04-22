import { user } from '../fixtures';
import moment from 'moment';

const headers = [
  { name: 'quoteNumberDetail', label: 'Quote Number', value: '-' },
  {
    name: 'propertyAddressDetail',
    label: 'Address',
    value: '4131 TEST ADDRESS'
  },
  { name: 'yearBuiltDetail', label: 'Year Built', value: '1998' },
  {
    name: 'constructionTypeDetail',
    label: 'Construction Type',
    value: 'MASONRY'
  },
  {
    name: 'coverageLimits.dwelling.amountDetail',
    label: 'Coverage A',
    value: '$ --'
  },
  { name: 'premium', label: 'Premium', value: '$ --' }
];

export default () =>
  // Add all main ph fields
  cy
    .wrap(Object.entries(user.policyDetails))
    .each(([field, value]) =>
      cy
        .findDataTag(field)
        .find('input')
        .type(`{selectall}{backspace}${value}`)
    )
    // Change effective date
    .findDataTag('effectiveDate')
    .type(
      moment
        .utc()
        .add('7', 'days')
        .format('YYYY-MM-DD')
    )
    // Select an agent
    .findDataTag('agentCode')
    .select(user.agentCode)
    // check detail header before submit (this allows time for the 'premium' animation to finish)
    .wrap(headers)
    .each(header => cy.checkDetailHeader(header))
    .clickSubmit('#QuoteWorkflow')
    // Expect that there is only one policyholder submitted
    .wait('@updateQuote')
    .then(({ response }) => {
      expect(response.body.status).to.equal(200);
    });
