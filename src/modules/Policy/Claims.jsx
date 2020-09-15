import React from 'react';
import PropTypes from 'prop-types';
import { date, SectionLoader } from '@exzeo/core-ui';
import { useFetchClaims } from '@exzeo/core-ui/src/@Harmony';
// Todo: Once we update to Font Awesome 6, use the Title component from core-ui and replace the SVG icon

const Claims = ({ initialValues }) => {
  const { policyNumber } = initialValues;

  const { claims: claimsData = [], loaded: claimsLoaded } = useFetchClaims(
    policyNumber
  );

  // Remove SIU and Subro claims (which have letters in the last part of the claimNumber)
  const filteredClaims = claimsData.filter(
    claim => !claim.claimNumber.split('-')[2].match(/[A-Z]/gi)
  );

  const sortedFilteredClaims = filteredClaims.sort((a, b) =>
    a.claimNumber < b.claimNumber ? -1 : 1
  );

  const formatStatus = status => {
    // e.g.: 'CLOSED (PAID)' gets formatted to 'Closed'
    const truncatedStatus = status.split(' (')[0].toLowerCase();
    const capitalizedStatus =
      truncatedStatus.charAt(0).toUpperCase() + truncatedStatus.substring(1);
    return capitalizedStatus;
  };

  const claims = sortedFilteredClaims
    .map((claim, idx) => {
      const {
        _id,
        claimNumber,
        status,
        lossType,
        dateReported,
        dateOfLoss,
        dateClosed
      } = claim;
      return (
        <section role="list" className="claim" key={_id}>
          {/* TODO this svg will be replaced when font awesome 6 is added */}
          <div className="title" role="heading" aria-level="2">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="house-damage"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className="claims-icon"
            >
              <path
                d="M288 114.96L69.47 307.71c-1.62 1.46-3.69 2.14-5.47 3.35V496c0 8.84 7.16 16 16 16h149.23L192 439.19l104.11-64-60.16-119.22L384 392.75l-104.11 64L319.81 512H496c8.84 0 16-7.16 16-16V311.1c-1.7-1.16-3.72-1.82-5.26-3.2L288 114.96zm282.69 121.32L512 184.45V48c0-8.84-7.16-16-16-16h-64c-8.84 0-16 7.16-16 16v51.69L314.75 10.31C307.12 3.45 297.56.01 288 0s-19.1 3.41-26.7 10.27L5.31 236.28c-6.57 5.91-7.12 16.02-1.21 22.6l21.4 23.82c5.9 6.57 16.02 7.12 22.6 1.21L277.42 81.63c6.05-5.33 15.12-5.33 21.17 0L527.91 283.9c6.57 5.9 16.69 5.36 22.6-1.21l21.4-23.82c5.9-6.57 5.36-16.69-1.22-22.59z"
                className=""
              ></path>
            </svg>
            {`Claim ${idx + 1}`}
          </div>
          <section className="claim-left">
            <dl>
              <div>
                <dt>Claim Number</dt>
                <dd>{claimNumber}</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Claim Status</dt>
                <dd>{formatStatus(status)}</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Loss Type</dt>
                <dd>{lossType}</dd>
              </div>
            </dl>
          </section>
          <section className="claim-right">
            <dl>
              <div>
                <dt>Reported Date</dt>
                <dd>{date.formatDate(dateReported)}</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Loss Date</dt>
                <dd>{date.formatDate(dateOfLoss)}</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Closed Date</dt>
                <dd>{(dateClosed && date.formatDate(dateClosed)) || 'N/A'}</dd>
              </div>
            </dl>
          </section>
        </section>
      );
    })
    .reverse();

  if (!claimsLoaded) {
    return <SectionLoader />;
  }
  return (
    <>
      {claimsData.length === 0 ? (
        <h4 class="no-results">
          There are no claims to display for this policy.
        </h4>
      ) : (
        <>{claims}</>
      )}
    </>
  );
};

Claims.propTypes = {
  initialValues: PropTypes.shape({ policyNumber: PropTypes.string })
};

export default Claims;
