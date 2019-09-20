import React from 'react';
import { fireEvent } from 'react-testing-library';

import {
  renderWithReduxAndRouter,
  defaultPolicyWorkflowProps,
  policyDocuments
} from '../../../test-utils';
import { PolicyWorkflow } from '../PolicyWorkflow';

describe('Policy Document Page testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/documents' },
    policyDocuments
  };

  it('POS:Has a table', () => {
    const { getByText } = renderWithReduxAndRouter(
      <PolicyWorkflow {...props} />
    );
    expect(getByText('Date'));
    expect(getByText('Document Type'));

    expect(document.querySelectorAll('tbody tr').length).toEqual(2);
  });

  it('POS:Defaults to latest docs first and sorting can be altered', () => {
    const { getByText, getAllByText } = renderWithReduxAndRouter(
      <PolicyWorkflow {...props} />
    );
    const documents = [
      { date: '06/14/2018 12:00 AM EDT', type: 'FinalDoc' },
      { date: '05/25/2018 11:57 AM EDT', type: 'Invoice' }
    ];
    const checkRows = () =>
      document.querySelectorAll('tbody tr').forEach(($row, i) => {
        const cols = $row.childNodes;
        expect(cols[0].textContent).toEqual(documents[i].date);
        expect(cols[1].textContent).toEqual(documents[i].type);
      });

    checkRows();

    fireEvent.click(getAllByText('Date')[1]);
    // We reverse our array after sorting by reverse date
    documents.reverse();
    checkRows();

    fireEvent.click(getAllByText('Date')[1]);
    documents.reverse();
    checkRows();

    fireEvent.click(getByText('Document Type'));
    documents.reverse();
    checkRows();
    fireEvent.click(getByText('Document Type'));
    documents.reverse();
    checkRows();
  });
});
