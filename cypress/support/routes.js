import { stub } from '../helpers';

export default (useConfig = false) => cy.server().log(Cypress.env('FIXTURES'));
