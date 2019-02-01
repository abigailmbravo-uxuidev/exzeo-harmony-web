import { createSelector } from 'reselect';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      return quoteData;
    }
  );