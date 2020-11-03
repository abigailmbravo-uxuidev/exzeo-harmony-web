import { setRouteAliases } from '../../helpers';

describe('Run Reports', () => {
  before('Login', () => {
    setRouteAliases();
    cy.login();
  });

  it('Navigate to Reports and download Book Of Business Report', () => {
    cy.findDataTag('nav-reports')
      .click()
      .wait('@listReport')
      .then(response => {
        expect(response.xhr.status).to.equal(200);
      });

    cy.findDataTag('Book_Of_Business_download_report')
      .click()
      .wait('@getReportById')
      .then(response => {
        expect(response.xhr.status).to.equal(200);
      });
  });
});
