import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import normalizeNumbers from '../Form/normalizeNumbers';
import Loader from '../Common/Loader';
import PolicyTabs from '../Common/PolicyTabs';

export const dateFormatter = cell => `${moment.unix(cell).format('MM/DD/YYYY')}`;
export const nameFormatter = cell => `${String(cell.match(/^(.+?)-/g)).replace('-', '')}`;

export const Coverage = ({ policy, policyNumber }) => {
  if (!policy || !policy.policyID) {
    return (<Loader />);
  }

  const { property, underwritingAnswers, rating, coverageLimits, coverageOptions, deductibles } = policy;
  const monthsOccupied = underwritingAnswers ? underwritingAnswers.monthsOccupied.answer : null;
  const everRented = underwritingAnswers ? underwritingAnswers.rented.answer : 'No';
  const noPriorIns = underwritingAnswers ? underwritingAnswers.noPriorInsuranceSurcharge.answer : 'No';
  const windMitFactor = rating ? rating.worksheet.elements.windMitigationFactors.windMitigationDiscount : '0';

  return (
    <React.Fragment>
      <PolicyTabs activeTab="coverage" policyNumber={policyNumber} />
      <section>
        <h3>Coverage Limits</h3>
        <div className="property-info">
          <dl>
            <div>
              <dt className="yearHomeBuilt">A. Dwelling</dt>
              <dd className="yearHomeBuilt">{`$ ${normalizeNumbers(coverageLimits.dwelling.amount)}`}</dd>
              <dt className="construction">B. Other Structures</dt>
              <dd className="construction">{`$ ${normalizeNumbers(coverageLimits.otherStructures.amount)}`}</dd>
              <dt className="yearRoofBuilt">C. Personal Property</dt>
              <dd className="yearRoofBuilt">{`$ ${normalizeNumbers(coverageLimits.personalProperty.amount)}`}</dd>
              <dt className="yearRoofBuilt">D. Loss of Use</dt>
              <dd className="yearRoofBuilt">{`$ ${normalizeNumbers(coverageLimits.lossOfUse.amount)}`}</dd>
              <dt className="yearRoofBuilt">E. Personal Liability</dt>
              <dd className="yearRoofBuilt">{`$ ${normalizeNumbers(coverageLimits.personalLiability.amount)}`}</dd>
              <dt className="yearRoofBuilt">F. Medical Payments</dt>
              <dd className="yearRoofBuilt">{ `$ ${normalizeNumbers(coverageLimits.medicalPayments.amount)}`}</dd>
              <dt className="yearRoofBuilt">Personal Property Replacement Cost</dt>
              <dd className="yearRoofBuilt">{coverageOptions.personalPropertyReplacementCost.answer ? 'Yes' : 'No'}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="moldProperty">Mold Property</dt>
              <dd className="moldProperty">{`$ ${normalizeNumbers(coverageLimits.moldProperty.amount)}`}</dd>
              <dt className="moldLiability">Mold Liability</dt>
              <dd className="moldLiability">{`$ ${normalizeNumbers(coverageLimits.moldLiability.amount)}`}</dd>
              <dt className="ordinanceOrLaw">Ordinance or Law</dt>
              <dd className="ordinanceOrLaw">{`${coverageLimits.ordinanceOrLaw.amount}%`}</dd>
              <dt className="allOtherPerils">All other Perils Deductible</dt>
              <dd className="allOtherPerils">{ `$ ${normalizeNumbers(deductibles.allOtherPerils.amount)}`}</dd>
              <dt className="hurricane">Hurricane Deductible</dt>
              <dd className="hurricane">{`$ ${normalizeNumbers(deductibles.hurricane.calculatedAmount)}`}</dd>
              <dt className="sinkhole">Sinkhole Deductible</dt>
              <dd className="sinkhole">{deductibles.sinkhole.calculatedAmount ? `$ ${normalizeNumbers(deductibles.sinkhole.calculatedAmount)}` : '$ 0'}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section>
        <h3>Discount / Surcharge</h3>
        <div className="property-info">
          <dl>
            <div>
              <dt className="townhouseRowhouse">Townhouse/Rowhouse</dt>
              <dd className="townhouseRowhouse">{property.townhouseRowhouse === false ? 'No' : 'Yes'}</dd>
              <dt className="everRented">Property Ever Rented</dt>
              <dd className="everRented">{everRented}</dd>
              <dt className="monthsOccupied">Seasonally Occupied</dt>
              <dd className="monthsOccupied">{monthsOccupied === '10+' || monthsOccupied === '7-9' ? 'No' : 'Yes'}</dd>
              <dt className="noPriorIns">No Prior Insurance</dt>
              <dd className="noPriorIns">{noPriorIns}</dd>
            </div>
          </dl>
          <dl>
            <div>
              <dt className="burglarAlarm">Burglar Alarm</dt>
              <dd className="burglarAlarm">{property.burglarAlarm ? 'Yes' : 'No'}</dd>
              <dt className="fireAlarm">Fire Alarm</dt>
              <dd className="fireAlarm">{property.fireAlarm ? 'Yes' : 'No'}</dd>
              <dt className="sprinkler">Sprinkler</dt>
              <dd className="sprinkler">{property.sprinkler === 'N' ? 'No' : property.sprinkler}</dd>
              <dt className="windMitFactor">Wind Mit Facor</dt>
              <dd className="windMitFactor">{windMitFactor}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section>
        <h3>Coverage Limits</h3>
        <div className="property-info">
          <dl>
            <div>
              <dt className="allOtherPerils">All other Perils</dt>
              <dd className="allOtherPerils">{ `$ ${normalizeNumbers(deductibles.allOtherPerils.amount)}`}</dd>
              <dt className="hurricane">Hurricane Deductible</dt>
              <dd className="hurricane">{`${normalizeNumbers(deductibles.hurricane.amount)}%`}</dd>
              <dt className="sinkhole">Sinkhole Deductible</dt>
              <dd className="sinkhole">{deductibles.sinkhole.amount ? `${normalizeNumbers(deductibles.sinkhole.amount)}%` : 'No'}</dd>
            </div>
          </dl>
        </div>
      </section>
    </React.Fragment>);
};

Coverage.contextTypes = {
  router: PropTypes.object
};

Coverage.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

const mapStateToProps = state => ({
  policy: state.service.latestPolicy
});

export default connect(mapStateToProps, null)(Coverage);
