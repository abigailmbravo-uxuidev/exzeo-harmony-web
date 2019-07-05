import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui';

const { numbers } = normalize;

export const Coverage = ({ policy }) => {
  const {
    property,
    underwritingAnswers,
    rating,
    coverageLimits,
    coverageOptions,
    deductibles
  } = policy;
  const {
    monthsOccupied,
    rented,
    noPriorInsuranceSurcharge
  } = underwritingAnswers;
  const monthsOcc = monthsOccupied ? monthsOccupied.answer : null;
  const everRented = rented ? rented.answer : 'No';
  const noPriorIns = noPriorInsuranceSurcharge
    ? noPriorInsuranceSurcharge.answer
    : 'No';
  const windMitFactor =
    rating && rating.worksheet
      ? rating.worksheet.elements.windMitigationFactors.windMitigationDiscount
      : '0';

  return (
    <div className="route-content coverage">
      <div className="detail-group property-details">
        <section className="display-element coverage-limits">
          <h3 className="section-group-header">
            <i className="fa fa-line-chart" /> Coverage Limits
          </h3>
          <div className="left">
            <dl>
              <div data-test="dwelling">
                <dt>A. Dwelling</dt>
                <dd>{`$ ${numbers(coverageLimits.dwelling.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="otherStructures">
                <dt>B. Other Structures</dt>
                <dd>{`$ ${numbers(coverageLimits.otherStructures.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="personalProperty">
                <dt>C. Personal Property</dt>
                <dd>{`$ ${numbers(
                  coverageLimits.personalProperty.amount
                )}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="lossOfUse">
                <dt>D. Loss of Use</dt>
                <dd>{`$ ${numbers(coverageLimits.lossOfUse.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="personalLiability">
                <dt>E. Personal Liability</dt>
                <dd>{`$ ${numbers(
                  coverageLimits.personalLiability.amount
                )}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="medicalPayments">
                <dt>F. Medical Payments</dt>
                <dd>{`$ ${numbers(coverageLimits.medicalPayments.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="personalPropertyReplacementCost">
                <dt>Personal Property Replacement Cost</dt>
                <dd>
                  {coverageOptions.personalPropertyReplacementCost.answer
                    ? 'Yes'
                    : 'No'}
                </dd>
              </div>
            </dl>
          </div>
          <div className="right re-stripe">
            <dl>
              <div data-test="moldProperty">
                <dt>Mold Property</dt>
                <dd>{`$ ${numbers(coverageLimits.moldProperty.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="moldLiability">
                <dt>Mold Liability</dt>
                <dd>{`$ ${numbers(coverageLimits.moldLiability.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="ordinanceOrLaw">
                <dt>Ordinance or Law</dt>
                <dd>{`${coverageLimits.ordinanceOrLaw.amount}%`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="allOtherPerils-coverageLimits">
                <dt>All other Perils Deductible</dt>
                <dd>{`$ ${numbers(deductibles.allOtherPerils.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="hurricane-coverageLimits">
                <dt>Hurricane Deductible</dt>
                <dd>{`$ ${numbers(
                  deductibles.hurricane.calculatedAmount
                )}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="sinkhole-coverageLimits">
                <dt>Sinkhole Deductible</dt>
                <dd>
                  {deductibles.sinkhole && deductibles.sinkhole.calculatedAmount
                    ? `$ ${numbers(deductibles.sinkhole.calculatedAmount)}`
                    : '$ 0'}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="display-element discount-discharge">
          <h3 className="section-group-header">
            <i className="fa fa-shopping-cart" /> Discount / Surcharge
          </h3>
          <div className="left">
            <dl>
              <div data-test="townhouseRowhouse">
                <dt>Townhouse/Rowhouse</dt>
                <dd>{property.townhouseRowhouse === false ? 'No' : 'Yes'}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="everRented">
                <dt>Property Ever Rented</dt>
                <dd>{everRented}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="monthsOccupied">
                <dt>Seasonally Occupied</dt>
                <dd>
                  {monthsOcc === '10+' || monthsOcc === '7-9' ? 'No' : 'Yes'}
                </dd>
              </div>
            </dl>
            <dl>
              <div data-test="noPriorInsurance">
                <dt>No Prior Insurance</dt>
                <dd>{noPriorIns}</dd>
              </div>
            </dl>
          </div>
          <div className="right">
            <dl>
              <div data-test="burglarAlarm">
                <dt>Burglar Alarm</dt>
                <dd>{property.burglarAlarm ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="fireAlarm">
                <dt>Fire Alarm</dt>
                <dd>{property.fireAlarm ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="sprinkler">
                <dt>Sprinkler</dt>
                <dd>
                  {property.sprinkler === 'N' ? 'No' : property.sprinkler}
                </dd>
              </div>
            </dl>
            <dl>
              <div data-test="windMitFactor">
                <dt>Wind Mit Factor</dt>
                <dd>{windMitFactor}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="display-element deductibles">
          <h3 className="section-group-header">
            <i className="fa fa-long-arrow-down" /> Deductible
          </h3>
          <div className="left half">
            <dl>
              <div data-test="allOtherPerils-deductibles">
                <dt>All other Perils</dt>
                <dd>{`$ ${numbers(deductibles.allOtherPerils.amount)}`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="hurricane-deductibles">
                <dt>Hurricane Deductible</dt>
                <dd>{`${numbers(deductibles.hurricane.amount)}%`}</dd>
              </div>
            </dl>
            <dl>
              <div data-test="sinkhole-deductibles">
                <dt>Sinkhole Deductible</dt>
                <dd>
                  {deductibles.sinkhole && deductibles.sinkhole.amount
                    ? `${numbers(deductibles.sinkhole.amount)}%`
                    : 'No'}
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </div>
  );
};

Coverage.propTypes = {
  policy: PropTypes.shape()
};

export default Coverage;
