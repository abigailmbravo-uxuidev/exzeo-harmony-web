import { createSelector } from 'reselect/lib/index';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector(
    [getQuote],
    (quoteData) => {
      if (!quoteData || !quoteData.quoteNumber) return {};
      if (window.harmony_web_use_fallback) {
        quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.PRIMARY);
      } else {
        quoteData.effectiveDate = formatDate(quoteData.effectiveDate, FORMATS.SECONDARY);
      }

      // if ((quoteData.underwritingAnswers.fourPointUpdates || {}).source === 'Default') {
      //
      // }

      if (quoteData.product === 'AF3') {
        return quoteData;
      }
      // // do some kind of transformation then it all works form here. Just a thought
      // quoteData.coverageLimits.otherStructures.value = Math.ceil((quoteData.coverageLimits.otherStructures.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      // quoteData.coverageLimits.personalProperty.value = Math.ceil((quoteData.coverageLimits.personalProperty.amount * 100) / quoteData.coverageLimits.dwelling.amount);
      // quoteData.coverageLimits.lossOfUse.value = Math.ceil(((quoteData.coverageLimits.lossOfUse.amount * 100) / quoteData.coverageLimits.dwelling.amount));
      // quoteData.deductibles.hurricane.value = quoteData.deductibles.hurricane.amount;
      // quoteData.additionalPolicyholder = (quoteData.policyHolders.length > 1 && quoteData.policyHolders[1].firstName);
      // quoteData.sameAsPropertyAddress = ((quoteData.policyHolderMailingAddress || {}).address1 === (quoteData.property.physicalAddress || {}).address1);
      return quoteData;
    }
  );