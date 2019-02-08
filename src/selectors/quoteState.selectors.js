import { createSelector } from 'reselect';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      // do some kind of transformation then it all works form here. Just a thought
      quoteData.coverageLimits.otherStructures.value = Math.ceil((quoteData.coverageLimits.otherStructures.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      quoteData.coverageLimits.personalProperty.value = Math.ceil((quoteData.coverageLimits.personalProperty.amount * 100) / quoteData.coverageLimits.dwelling.amount)
      // personalPropertyAmount: Math.ceil(((updatedQuote.personalPropertyAmount / 100) * updatedQuote.dwellingAmount)),
      // personalPropertyReplacementCostCoverage: (updatedQuote.personalPropertyReplacementCostCoverage || false),
      // propertyIncidentalOccupanciesMainDwelling: (updatedQuote.propertyIncidentalOccupancies === 'Main Dwelling'),
      // propertyIncidentalOccupanciesOtherStructures: (updatedQuote.propertyIncidentalOccupancies === 'Other Structures'),
      // lossOfUse: Math.ceil(((updatedQuote.lossOfUseAmount / 100) * updatedQuote.dwellingAmount)),
      // liabilityIncidentalOccupancies: (updatedQuote.propertyIncidentalOccupancies !== 'None'),
      // calculatedHurricane: Math.ceil(((updatedQuote.hurricane / 100.0) * updatedQuote.dwellingAmount)),
      return quoteData;
    }
  );