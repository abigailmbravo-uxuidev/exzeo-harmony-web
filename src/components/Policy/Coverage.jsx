import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui/lib/InputLifecycle/index';
import PolicyTabs from '../Common/PolicyTabs';

const { numbers } = normalize;

export const Coverage = ({ policy, policyNumber }) => {
  const { property, underwritingAnswers, rating, coverageLimits, coverageOptions, deductibles } = policy;
  const { monthsOccupied, rented, noPriorInsuranceSurcharge } = underwritingAnswers;
  const monthsOcc = monthsOccupied ? monthsOccupied.answer : null;
  const everRented = rented ? rented.answer : 'No';
  const noPriorIns = noPriorInsuranceSurcharge ? noPriorInsuranceSurcharge.answer : 'No';
  const windMitFactor = rating && rating.worksheet ? rating.worksheet.elements.windMitigationFactors.windMitigationDiscount : '0';

  return (
    <React.Fragment>
      <PolicyTabs activeTab="coverage" policyNumber={policyNumber} />
      <div className="route-content coverage">
          <div className="detail-group property-details">
            <section className="display-element coverage-limits">
              <h3 className="section-group-header"><i className="fa fa-line-chart" /> Coverage Limits</h3>
              <dl>
                <div>
                  <dt className="yearHomeBuilt">A. Dwelling</dt>
                  <dd className="yearHomeBuilt">{`$ ${numbers(coverageLimits.dwelling.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="construction">B. Other Structures</dt>
                  <dd className="construction">{`$ ${numbers(coverageLimits.otherStructures.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="yearRoofBuilt">C. Personal Property</dt>
                  <dd className="yearRoofBuilt">{`$ ${numbers(coverageLimits.personalProperty.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="yearRoofBuilt">D. Loss of Use</dt>
                  <dd className="yearRoofBuilt">{`$ ${numbers(coverageLimits.lossOfUse.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="yearRoofBuilt">E. Personal Liability</dt>
                  <dd className="yearRoofBuilt">{`$ ${numbers(coverageLimits.personalLiability.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="yearRoofBuilt">F. Medical Payments</dt>
                  <dd className="yearRoofBuilt">{ `$ ${numbers(coverageLimits.medicalPayments.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="yearRoofBuilt">Personal Property Replacement Cost</dt>
                  <dd className="yearRoofBuilt">{coverageOptions.personalPropertyReplacementCost.answer ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="moldProperty">Mold Property</dt>
                  <dd className="moldProperty">{`$ ${numbers(coverageLimits.moldProperty.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="moldLiability">Mold Liability</dt>
                  <dd className="moldLiability">{`$ ${numbers(coverageLimits.moldLiability.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="ordinanceOrLaw">Ordinance or Law</dt>
                  <dd className="ordinanceOrLaw">{`${coverageLimits.ordinanceOrLaw.amount}%`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="allOtherPerils">All other Perils Deductible</dt>
                  <dd className="allOtherPerils">{ `$ ${numbers(deductibles.allOtherPerils.amount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="hurricane">Hurricane Deductible</dt>
                  <dd className="hurricane">{`$ ${numbers(deductibles.hurricane.calculatedAmount)}`}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="sinkhole">Sinkhole Deductible</dt>
                  <dd className="sinkhole">{deductibles.sinkhole && deductibles.sinkhole.calculatedAmount ? `$ ${numbers(deductibles.sinkhole.calculatedAmount)}` : '$ 0'}</dd>
                </div>
              </dl>
            </section>
            <section className="display-element discount-discharge">
              <h3 className="section-group-header"><i className="fa fa-shopping-cart" /> Discount / Surcharge</h3>
              <dl>
                <div>
                  <dt className="townhouseRowhouse">Townhouse/Rowhouse</dt>
                  <dd className="townhouseRowhouse">{property.townhouseRowhouse === false ? 'No' : 'Yes'}</dd>
                </div>
                <div>
                  <dt className="everRented">Property Ever Rented</dt>
                  <dd className="everRented">{everRented}</dd>
                </div>
                <div>
                  <dt className="monthsOccupied">Seasonally Occupied</dt>
                  <dd className="monthsOccupied">{monthsOcc === '10+' || monthsOcc === '7-9' ? 'No' : 'Yes'}</dd>
                </div>
                <div>
                  <dt className="noPriorIns">No Prior Insurance</dt>
                  <dd className="noPriorIns">{noPriorIns}</dd>
                </div>
              </dl>
              <dl>
                <div>
                  <dt className="burglarAlarm">Burglar Alarm</dt>
                  <dd className="burglarAlarm">{property.burglarAlarm ? 'Yes' : 'No'}</dd>
                </div>
                <div>
                  <dt className="fireAlarm">Fire Alarm</dt>
                  <dd className="fireAlarm">{property.fireAlarm ? 'Yes' : 'No'}</dd>
                </div>
                <div>
                  <dt className="sprinkler">Sprinkler</dt>
                  <dd className="sprinkler">{property.sprinkler === 'N' ? 'No' : property.sprinkler}</dd>
                </div>
                <div>
                  <dt className="windMitFactor">Wind Mit Facor</dt>
                  <dd className="windMitFactor">{windMitFactor}</dd>
                </div>
              </dl>
            </section>
            <section className="display-element deductibles">
              <h3 className="section-group-header"><i className="fa fa-long-arrow-down" /> Deductible</h3>
              <dl>
                <div>
                  <dt className="allOtherPerils">All other Perils</dt>
                  <dd className="allOtherPerils">{ `$ ${numbers(deductibles.allOtherPerils.amount)}`}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                  <dt className="hurricane">Hurricane Deductible</dt>
                  <dd className="hurricane">{`${numbers(deductibles.hurricane.amount)}%`}</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                  <dt className="sinkhole">Sinkhole Deductible</dt>
                  <dd className="sinkhole">{deductibles.sinkhole && deductibles.sinkhole.amount ? `${numbers(deductibles`.sinkhole`.amount)}%` : 'No'}</dd>
                </div>
              </dl>
            </section>
          </div>
      </div>
    </React.Fragment>);
};

Coverage.contextTypes = {
  router: PropTypes.object
};

Coverage.propTypes = {
  policy: PropTypes.shape(),
  policyNumber: PropTypes.string
};

export default Coverage;
