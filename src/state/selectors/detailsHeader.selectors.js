import { createSelector } from 'reselect';
import moment from 'moment-timezone';

import * as detailUtils from '../../utilities/entityDetails';

const STANDARD_DATE_FORMAT = 'MM/DD/YYYY';
const getCityStateZip = ({ city = '', state = '', zip = '' }) => `${city}, ${state} ${zip}`;
const getLocation = (state, location) => location;
const getPolicy = state => state.service.latestPolicy;
const getSummaryLedger = state => state.service.getSummaryLedger;
const getQuote = state => state.quoteState.quote || {};
const baseMapUri = 'https://www.google.com/maps/search/?api=1&query=';

const defaultEntity = {
  details: {},
  policyHolder: {},
  mailingAddress: {},
  propertyAddress: {},
  property: {},
  premium: {},
  cancellation: {}
};

export const getPolicyDetails = createSelector(
  [getPolicy, getSummaryLedger],
  (policy, summaryLedger) => {
    if (!policy || !policy.policyNumber || !summaryLedger) return defaultEntity;

    const {
      cancelDate,
      effectiveDate,
      endDate,
      policyHolders,
      policyHolderMailingAddress: pHMA = {},
      policyID,
      policyNumber,
      product,
      property,
      sourceNumber,
      status
    } = policy;

    const {
      currentPremium,
      status: { displayText, code }
    } = summaryLedger;

    const {
      constructionType,
      physicalAddress,
      territory
    } = property;

    const mapQuery = detailUtils.getMapQuery(physicalAddress);
    const cancellationDate = detailUtils.getCancellationDate(summaryLedger, status, endDate, cancelDate);
    const showReinstatement = detailUtils.shouldShowReinstatement(status, code);
    const dateLabel = detailUtils.getEntityDetailsDateLabel(displayText, status);
    const finalPayment = detailUtils.getFinalPaymentDate(summaryLedger, status);

    return {
      constructionType,
      policyID,
      policyNumber,
      sourceNumber,
      territory,
      county: physicalAddress.county,
      currentPremium: detailUtils.getCurrentPremium(currentPremium),
      effectiveDate: moment.utc(effectiveDate).format(STANDARD_DATE_FORMAT),
      mapURI: `${baseMapUri}${mapQuery}`,
      status: `${status} / ${displayText}`,
      details: {
        product: detailUtils.getProductName(product)
      },
      policyHolder: detailUtils.getPrimaryPolicyHolder(policyHolders),
      mailingAddress: detailUtils.getMailingAddress(pHMA),
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: detailUtils.getCityStateZip(physicalAddress)
      },
      cancellation: {
        label: dateLabel,
        value: cancellationDate,
        showReinstatement
      },
      finalPayment,
      sourcePath: sourceNumber ? `/quote/${sourceNumber}/coverage` : null
    };
  }
);

export const getQuoteDetails = createSelector(
  [getLocation, getQuote],
  (location, quote) => {
    if (!quote || !quote.quoteNumber) return defaultEntity;

    const {
      coverageLimits,
      rating,
      property,
    } = quote;

    const {
      constructionType,
      floodZone,
      physicalAddress,
      territory,
      yearBuilt
    } = property;

    const activeTask = location.slice(location.lastIndexOf('/') + 1);
    const quoteNumber = rating ? quote.quoteNumber : '-';

    return {
      constructionType,
      floodZone,
      territory,
      yearBuilt,
      coverageLimits,
      county: physicalAddress.county,
      quoteNumber,
      premium: rating ? rating.totalPremium : '',
      status: quote,
      useAnimationForPremium: activeTask === 'askToCustomizeDefaultQuote',
      propertyAddress: {
        address1: physicalAddress.address1,
        address2: physicalAddress.address2,
        csz: getCityStateZip(physicalAddress)
      }
    };
  }
);
