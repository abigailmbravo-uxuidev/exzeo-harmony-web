import React from 'react';
import QuoteCard from '../@components/QuoteCard';
import { render } from '../../../test-utils';

describe('QuoteCard tests', () => {
  const quote = {
    _id: '1234',
    quoteNumber: '12-3456-78',
    policyHolders: [{ firstName: 'Oberyn', lastName: 'Martell' }],
    product: 'HO3',
    property: {
      physicalAddress: {
        address1: '123 Test Ave',
        city: 'Tampa',
        state: 'FL',
        zip: '33607'
      }
    },
    quoteState: 'State of quote',
    effectiveDate: '2020-01-31T05:00:00.000Z',
    createdAt: '2020-01-24T05:00:00.000Z',
    rating: { totalPremium: 1000 }
  };

  test('Should display quote info', () => {
    const props = { quote, handleClick: x => x };
    const { getByText, getByLabelText } = render(<QuoteCard {...props} />);

    expect(getByText('Oberyn Martell')).toBeInTheDocument();
    expect(getByText('$ 1000')).toBeInTheDocument();
    expect(getByText('123 Test Ave Tampa, FL 33607')).toBeInTheDocument();
    expect(getByText('12-3456-78')).toBeInTheDocument();
    expect(getByText('HO3')).toBeInTheDocument();

    expect(getByLabelText('Effective').lastChild.textContent).toBe(
      '01/31/2020'
    );
    expect(getByLabelText('Started').lastChild.textContent).toBe('01/24/2020');
  });

  test('Should gracefully handle missing first and last name', () => {
    const props = {
      handleClick: x => x,
      quote: {
        ...quote,
        policyHolders: []
      }
    };

    const { getByTitle, queryByTitle } = render(<QuoteCard {...props} />);
    expect(getByTitle('')).toBeInTheDocument();
    expect(queryByTitle(/undefined undefined/)).toBeNull();
  });

  test('Should use product displayName', () => {
    const props = {
      handleClick: x => x,
      quote: {
        ...quote,
        product: 'AF3'
      }
    };

    const { getByText, queryByText } = render(<QuoteCard {...props} />);

    expect(getByText(/Flood/)).toBeInTheDocument();
    expect(queryByText(/AF3/i)).toBeNull();
  });
});
