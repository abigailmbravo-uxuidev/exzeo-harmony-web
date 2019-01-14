import { chmodSync } from "fs";

describe('Agency Happy Path', () => {
  it('Navigates through the entire happy path', () => {
    cy.happypathTo();
  });
});