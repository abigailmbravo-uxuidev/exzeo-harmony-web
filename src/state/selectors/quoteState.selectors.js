import { createSelector } from 'reselect/lib/index';
import { formatDate, FORMATS } from '@exzeo/core-ui/src/Utilities/date';

export const getQuote = state => state.quoteState.quote || {};

export const getQuoteSelector = createSelector([getQuote], quoteData => {
  if (!quoteData || !quoteData.quoteNumber) return {};
  if (window.harmony_web_use_fallback) {
    quoteData.effectiveDate = formatDate(
      quoteData.effectiveDate,
      FORMATS.PRIMARY
    );
  } else {
    quoteData.effectiveDate = formatDate(
      quoteData.effectiveDate,
      FORMATS.SECONDARY
    );
  }

  if (quoteData.policyHolders[1] && quoteData.policyHolders[1].firstName) {
    quoteData.additionalPolicyholder = true;
  }

  quoteData.sameAsPropertyAddress =
    quoteData.property.physicalAddress.address1 ===
      quoteData.policyHolderMailingAddress?.address1 &&
    quoteData.property.physicalAddress.address2 ===
      quoteData.policyHolderMailingAddress?.address2 &&
    quoteData.property.physicalAddress.city ===
      quoteData.policyHolderMailingAddress?.city &&
    quoteData.property.physicalAddress.state ===
      quoteData.policyHolderMailingAddress?.state &&
    quoteData.property.physicalAddress.zip ===
      quoteData.policyHolderMailingAddress?.zip;

  if (quoteData.product === 'AF3') {
    quoteData.personalPropertySlider = Math.ceil(
      (quoteData.coverageLimits.personalProperty.amount * 100) /
        quoteData.coverageLimits.building.amount
    );
    return quoteData;
  }

  return quoteData;
});
