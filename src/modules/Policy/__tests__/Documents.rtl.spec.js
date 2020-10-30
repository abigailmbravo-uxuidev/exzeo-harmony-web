import React from 'react';

import {
  render,
  fireEvent,
  defaultPolicyWorkflowProps,
  policyDocuments,
  mockServiceRunner,
  wait,
  waitForElementToBeRemoved
} from '../../../test-utils';
import PolicyWorkflow from '../PolicyWorkflow';

describe('Policy Document Page testing', () => {
  const props = {
    ...defaultPolicyWorkflowProps,
    location: { pathname: '/policy/12-345-67/documents' },
    match: { params: { step: 'documents', policyNumber: '12-345-67' } }
  };

  it('POS:Has a table', async () => {
    mockServiceRunner(policyDocuments);
    const { getAllByText, getByRole } = render(<PolicyWorkflow {...props} />);

    await waitForElementToBeRemoved(() => getByRole('status'));
    expect(getAllByText('Date'));
    expect(getAllByText('Document Type'));

    expect(document.querySelectorAll('tbody tr').length).toEqual(2);
  });

  it('POS:Defaults to latest docs first and sorting can be altered', async () => {
    mockServiceRunner(policyDocuments);
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

    const { getByText, getAllByText, getByRole } = render(
      <PolicyWorkflow {...props} />
    );

    await waitForElementToBeRemoved(() => getByRole('status'));
    checkRows();

    fireEvent.click(getAllByText('Date')[1]);
    // We reverse our array after sorting by reverse date
    documents.reverse();
    await wait(checkRows);

    fireEvent.click(getAllByText('Date')[1]);
    documents.reverse();
    await wait(checkRows);

    fireEvent.click(getByText('Document Type'));
    documents.reverse();
    await wait(checkRows);
    fireEvent.click(getByText('Document Type'));
    documents.reverse();
    await wait(checkRows);
  });
});
