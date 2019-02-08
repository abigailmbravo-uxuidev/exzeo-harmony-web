import { createSelector } from 'reselect';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      // do some kind of transformation then it all works form here. Just a thought
      quoteData.coverageLimits.otherStructures.amount = (quoteData.coverageLimits.otherStructures.amount * 100) / quoteData.coverageLimits.dwelling.amount
      return quoteData;
    }
  );