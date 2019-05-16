import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import { policyDocuments } from '../../../test-utils';
import Documents from '../Documents';

describe('Policy Document Page testing', () => {
  const props = {
    policyDocuments
  };

  it('POS:Has a table', () => {
    const { getByText } = render(<Documents {...props} />);
    expect(getByText('Date'));
    expect(getByText('Document Type'));

    expect(document.querySelectorAll('tbody tr').length).toEqual(2);
  });

  it('POS:Defaults to latest docs first and sorting can be altered', () => {
    const { getByText } = render(<Documents {...props} />);
    const documents = [
      { date: '06/14/2018 12:00 AM EDT', type: 'FinalDoc' },
      { date: '05/25/2018 11:57 AM EDT', type: 'Invoice' }
    ];

    document.querySelectorAll('tbody tr').forEach(($row, i) => {
      expect($row.firstChild.textContent).toEqual(documents[i].date);
      expect($row.lastChild.textContent).toEqual(documents[i].type);
    });

    fireEvent.click(getByText('Date'));
    // We reverse our array after sorting by reverse date
    documents.reverse();
    document.querySelectorAll('tbody tr').forEach(($row, i) => {
      expect($row.firstChild.textContent).toEqual(documents[i].date);
      expect($row.lastChild.textContent).toEqual(documents[i].type);
    });
  });
});
