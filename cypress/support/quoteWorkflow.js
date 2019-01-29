// Custom command to use the happypath to navigate through the app to a specific page to stop on
// If your test stops at any specific page it will assert the URL is correct for that page
// Defaults to the entire happy path, returning you to landing
// Stop Pages are: ['landing', 'searchAddress', 'customerInfo', 'underwriting', 'customize', 'share'
// 'assumptions', 'additionalInterests', 'mailingBilling', 'verify', 'thankYou']

import user from '../fixtures/user.json';
import underwriting from '../fixtures/underwriting.json';
import { _login, _landing, _searchAddress, _customerInfo, _underwriting, _customize, _share, _assumptions, _additionalInterests, _mailingBilling, _verify, _scheduleDate, _thankYou } from './navigation';

Cypress.Commands.add('quoteWorkflow', (stop, start = 'login', data = { user, underwriting }) => {
  const { address, customerInfo, agentCode } = user;
  let prev;

  if (start === 'login') {
    _login();
    prev = 'login';
    }

  if ((stop !== 'landing' && prev === 'login') || start === 'landing') {
    _landing();
    prev = 'landing';
  }

  if ((stop !== 'searchAddress' && prev === 'landing') || start === 'searchAddress') {
    _searchAddress(address);
    prev = 'searchAddress';
  }

  if ((stop !== 'customerInfo' && prev === 'searchAddress') || start === 'customerInfo') {
    _customerInfo(customerInfo, agentCode);
    prev = 'customerInfo';
  }

  if ((stop !== 'underwriting' && prev === 'customerInfo') || start === 'underwriting') {
    _underwriting(underwriting);
    prev  = 'underwriting';
  }

  if ((stop !== 'customize' && prev === 'underwriting') || start === 'customize') {
    _customize();
    prev = 'customize';
  }

  if ((stop !== 'share' && prev === 'customize') || start === 'share') {
    _share();
    prev = 'share';
  }

  if ((stop !== 'assumptions' && prev === 'share') || start === 'assumptions') {
    _assumptions();
    prev = 'assumptions';
  }

  if ((stop !== 'additionalInterests' && prev === 'assumptions') || start === 'additionalInterests') {
    _additionalInterests();
    prev = 'additionalInterests';
  }

  if ((stop !== 'mailingBilling' && prev === 'additionalInterests') || start === 'mailingBilling') {
    _mailingBilling();
    prev = 'mailingBilling';
  }

  if ((stop !== 'verify' && prev === 'mailingBilling') || start === 'verify') {
    _verify();
    prev = 'verify';
  }

  if ((stop !== 'scheduleDate'  && prev === 'verify') || start === 'scheduleDate') {
    _scheduleDate();
    prev = 'scheduleDate';
  }

  if ((stop !== 'thankYou' && prev === 'scheduleDate') || start === 'thankYou') {
    _thankYou();
  }
});
