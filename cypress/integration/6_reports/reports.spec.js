import { setRouteAliases } from '../../helpers';
import { loginReports } from '../../fixtures';

describe('Run Reports', () => {
  before('Login', () => {
    setRouteAliases();
    cy.login(loginReports);
  });

  it('Navigate to Reports and download Book Of Business Report', () => {
    cy.findDataTag('nav-reports')
      .click()
      .wait('@listReport');

    cy.findDataTag('Book_Of_Business_download_report')
      .click()
      .wait('@getReportById')
      .then(response => {
        expect(response.xhr.status).to.equal(200);
      });
  });
});
