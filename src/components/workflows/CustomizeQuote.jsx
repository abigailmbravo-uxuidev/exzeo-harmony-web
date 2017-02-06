/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for */
import React, { Component, PropTypes } from 'react';

const quoteInfo = {
  coverageLimits: {
    personalProperty: {
      // format: 'Currency',
      // amount: 238000,
      format: 'Percentage',
      amount: 50,
    },
    otherStructures: {
      format: 'Percentage',
      amount: 10,
    },
    medicalPayments: {
      format: 'Currency',
      amount: 2000,
    },
    moldProperty: {
      format: 'Currency',
      amount: 10000,
    },
    ordinanceOrLaw: {
      format: 'Percentage',
      amount: 25,
    },
    lossOfUse: {
      format: 'Percentage',
      amount: 10,
    },
    personalLiability: {
      format: 'Currency',
      amount: 100000,
    },
    dwelling: {
      format: 'Currency',
      maxAmount: 618800,
      amount: 476000,
      minAmount: 428400,
    },
    moldLiability: {
      format: 'Currency',
      amount: 50000,
    },
  },
  coverageOptions: {
    sinkholePerilCoverage: {
      answer: false,
    },
    propertyIncidentalOccupanciesOtherStructures: {
      answer: false,
    },
    liabilityIncidentalOccupancies: {
      answer: false,
    },
    personalPropertyReplacementCost: {
      answer: false,
    },
    propertyIncidentalOccupanciesMainDwelling: {
      answer: false,
    },
  },
  deductibles: {
    sinkhole: {
      format: 'Percentage',
      amount: 10,
    },
    hurricane: {
      format: 'Percentage',
      amount: 10,
    },
    allOtherPerils: {
      format: 'Currency',
      amount: 2500,
    },
  },
};


class CustomizeQuote extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    updated: false,
    dwellingAmount: quoteInfo.coverageLimits.dwelling.amount,
    otherStructuresAmount: quoteInfo.coverageLimits.otherStructures.amount,
    personalPropertyReplacementCostCoverage: false,
    personalPropertyAmount: quoteInfo.coverageLimits.personalProperty.amount,
    personalLiability: quoteInfo.coverageLimits.personalLiability.amount,
    moldProperty: quoteInfo.coverageLimits.moldProperty.amount,
    moldLiability: quoteInfo.coverageLimits.moldLiability.amount,
    lossOfUse: quoteInfo.coverageLimits.lossOfUse.amount,
    ordinanceOrLaw: quoteInfo.coverageLimits.ordinanceOrLaw.amount,
    propertyIncidentalOccupancies: 'None',
    sinkholeCoverage: quoteInfo.coverageOptions.sinkholePerilCoverage.answer,
    allOtherPerils: quoteInfo.deductibles.allOtherPerils.amount,
    hurricane: quoteInfo.deductibles.hurricane.amount,
  }

  handleChange = (event) => {
    const { state } = this;
    state[event.target.name] = event.target.value;
    state.updated = true;
    this.setState(state);
  }

  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    const { state } = this;
    if (state.updated) {
      // Do two mutations
      state.updated = false;
      this.setState(state);
    } else {
      this.context.router.push('/workflow/shareQuote');
    }
  }

  render() {
    return (
    <form className="fade-in" id="customize-quote" onSubmit={this.handleSubmit}>
      <div className="form-group survey-wrapper" role="group">
        <h4 className="section-group-header"><i className="fa fa-balance-scale"></i> Coverage Limits</h4>
        <div className="form-group range-component">
          <label htmlFor="dwellingAmount">
            Dwelling Limit
          </label>
          <div className="range-wrapper">
            <div className="range-control-wrapper">
              <span className="range-limit">{Math.ceil(quoteInfo.coverageLimits.dwelling.minAmount)}</span>
              <input
                type="range"
                name="dwellingAmount"
                min={Math.ceil(quoteInfo.coverageLimits.dwelling.minAmount)}
                max={Math.floor(quoteInfo.coverageLimits.dwelling.maxAmount)}
                step={1000}
                value={this.state.dwellingAmount}
                onChange={this.handleChange}
              />
              <span className="range-limit">{Math.floor(quoteInfo.coverageLimits.dwelling.maxAmount)}</span>
            </div>
            <span className="range-value">
              <input
                type="text"
                name="dwellingAmount"
                value={this.state.dwellingAmount}
                onChange={this.handleChange}
              />
            </span>
          </div>
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Other Structures Limit
            <input
              type="text"
              value={this.state.dwellingAmount * (this.state.otherStructuresAmount / 100)}
              readOnly
            />
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-4${this.state.otherStructuresAmount === 0 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0 } })}
            >
              <label className="label-segmented" htmlFor="otherStructuresAmount">
                <input
                  type="radio"
                  name="otherStructuresAmount"
                  onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0 } })}
                  value={0}
                />
                <span>0%</span>
              </label>
            </div>
            <div
              className={`radio-column-4${this.state.otherStructuresAmount === 2 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 2 } })}
            >
              <label className="label-segmented" htmlFor="otherStructuresAmount">
                <input
                  type="radio"
                  name="otherStructuresAmount"
                  onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 2 } })}
                  value={2}
                />
                <span>2%</span>
              </label>
            </div>
            <div
              className={`radio-column-4${this.state.otherStructuresAmount === 5 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 5 } })}
            >
              <label className="label-segmented" htmlFor="otherStructuresAmount">
                <input
                  type="radio"
                  name="otherStructuresAmount"
                  onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 5 } })}
                  value={5}
                />
                <span>5%</span>
              </label>
            </div>
            <div
              className={`radio-column-4${this.state.otherStructuresAmount === 10 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 10 } })}
            >
              <label className="label-segmented" htmlFor="otherStructuresAmount">
                <input
                  type="radio"
                  name="otherStructuresAmount"
                  onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 10 } })}
                  value={10}
                />
                <span>10%</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group switch">
          <label
            htmlFor="personalPropertyReplacementCostCoverage"
            onClick={() => this.handleChange({
              target: {
                name: 'personalPropertyReplacementCostCoverage',
                value: !this.state.personalPropertyReplacementCostCoverage,
              },
            })}
          >
            Do you want Personal Property Replacement Cost Coverage?
            <input
              type="checkbox"
              name="personalPropertyReplacementCostCoverage"
              checked={this.state.personalPropertyReplacementCostCoverage}
              onChange={() => this.handleChange({
                target: {
                  name: 'personalPropertyReplacementCostCoverage',
                  value: !this.state.personalPropertyReplacementCostCoverage,
                },
              })}
            />
            <div className="switch-div" />
          </label>
        </div>
        {this.state.personalPropertyReplacementCostCoverage &&
          <div className="form-group segmented" role="group">
            <label className="group-label label-segmented">
              Personal Property Limit
              <input
                type="text"
                value={
                  this.state.dwellingAmount * (this.state.personalPropertyAmount / 100)
                }
                readOnly
              />
            </label>
            <div className="segmented-answer-wrapper">
              <div
                className={`radio-column-4${this.state.personalPropertyAmount === 0 ? ' selected' : ''}`}
                onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0 } })}
              >
                <label className="label-segmented" htmlFor="personalPropertyAmount">
                  <input
                    type="radio"
                    name="personalPropertyAmount"
                    onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0 } })}
                    value={0}
                  />
                  <span>0%</span>
                </label>
              </div>
              <div
                className={`radio-column-4${this.state.personalPropertyAmount === 25 ? ' selected' : ''}`}
                onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 25 } })}
              >
                <label className="label-segmented" htmlFor="personalPropertyAmount">
                  <input
                    type="radio"
                    name="personalPropertyAmount"
                    onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 25 } })}
                    value={25}
                  />
                  <span>25%</span>
                </label>
              </div>
              <div
                className={`radio-column-4${this.state.personalPropertyAmount === 35 ? ' selected' : ''}`}
                onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 35 } })}
              >
                <label className="label-segmented" htmlFor="personalPropertyAmount">
                  <input
                    type="radio"
                    name="personalPropertyAmount"
                    onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 35 } })}
                    value={35}
                  />
                  <span>35%</span>
                </label>
              </div>
              <div
                className={`radio-column-4${this.state.personalPropertyAmount === 50 ? ' selected' : ''}`}
                onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 50 } })}
              >
                <label className="label-segmented" htmlFor="personalPropertyAmount">
                  <input
                    type="radio"
                    name="personalPropertyAmount"
                    onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 50 } })}
                    value={50}
                  />
                  <span>50%</span>
                </label>
              </div>
            </div>
          </div>
        }
        <div className="form-group">
          <label htmlFor="lossOfUseAmount">
            Loss of Use Limit
          </label>
          <input
            type="text"
            value={this.state.dwellingAmount * (this.state.lossOfUse / 100)}
            readOnly
          />
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Personal Property Limit
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-2${this.state.personalLiability === 100000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'personalLiability', value: 100000 } })}
            >
              <label className="label-segmented" htmlFor="personalLiability">
                <input
                  type="radio"
                  name="personalLiability"
                  onChange={() => this.handleChange({ target: { name: 'personalLiability', value: 100000 } })}
                  value={100000}
                />
                <span>$100000</span>
              </label>
            </div>
            <div
              className={`radio-column-2${this.state.personalLiability === 300000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'personalLiability', value: 300000 } })}
            >
              <label className="label-segmented" htmlFor="personalLiability">
                <input
                  type="radio"
                  name="personalLiability"
                  onChange={() => this.handleChange({ target: { name: 'personalLiability', value: 300000 } })}
                  value={300000}
                />
                <span>$300000</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="medicalPaymentsToOthers">
            Medical Payments to Others
          </label>
          <input
            type="text"
            name="medicalPaymentsToOthers"
            value={2000}
            readOnly
          />
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Property
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-3${this.state.moldProperty === 10000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'moldProperty', value: 10000 } })}
            >
              <label className="label-segmented" htmlFor="moldProperty">
                <input
                  type="radio"
                  name="moldProperty"
                  onChange={() => this.handleChange({ target: { name: 'moldProperty', value: 10000 } })}
                  value={10000}
                />
                <span>$10,000</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.moldProperty === 25000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'moldProperty', value: 25000 } })}
            >
              <label className="label-segmented" htmlFor="moldProperty">
                <input
                  type="radio"
                  name="moldProperty"
                  onChange={() => this.handleChange({ target: { name: 'moldProperty', value: 25000 } })}
                  value={25000}
                />
                <span>$25,000</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.moldProperty === 50000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'moldProperty', value: 50000 } })}
            >
              <label className="label-segmented" htmlFor="moldProperty">
                <input
                  type="radio"
                  name="moldProperty"
                  onChange={() => this.handleChange({ target: { name: 'moldProperty', value: 50000 } })}
                  value={50000}
                />
                <span>$50,000</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Limited Fungi, Wet or Dry Rot, Yeast or Bacteria Coverage - Liability
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-2${this.state.moldLiability === 50000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'moldLiability', value: 50000 } })}
            >
              <label className="label-segmented" htmlFor="moldLiability">
                <input
                  type="radio"
                  name="moldLiability"
                  onChange={() => this.handleChange({ target: { name: 'moldLiability', value: 50000 } })}
                  value={50000}
                />
                <span>$50,000</span>
              </label>
            </div>
            <div
              className={`radio-column-2${this.state.moldLiability === 100000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'moldLiability', value: 100000 } })}
            >
              <label className="label-segmented" htmlFor="moldLiability">
                <input
                  type="radio"
                  name="moldLiability"
                  onChange={() => this.handleChange({ target: { name: 'moldLiability', value: 100000 } })}
                  value={100000}
                />
                <span>$100,000</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Ordinance or Law Coverage Limit
            <input
              type="text"
              value={(this.state.ordinanceOrLaw / 100) * this.state.dwellingAmount}
              readOnly
            />
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-2${this.state.ordinanceOrLaw === 25 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 25 } })}
            >
              <label className="label-segmented" htmlFor="ordinanceOrLaw">
                <input
                  type="radio"
                  name="ordinanceOrLaw"
                  onChange={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 25 } })}
                  value={25}
                />
                <span>25% of Dwelling Limit</span>
              </label>
            </div>
            <div
              className={`radio-column-2${this.state.ordinanceOrLaw === 50 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 50 } })}
            >
              <label className="label-segmented" htmlFor="ordinanceOrLaw">
                <input
                  type="radio"
                  name="ordinanceOrLaw"
                  onChange={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 50 } })}
                  value={50}
                />
                <span>50% of Dwelling Limit</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group survey-wrapper" role="group">
        <h4 className="section-group-header"><i className="fa fa-tasks"></i> Coverage Options</h4>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Property Permitted Incidental Occupancies
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-3${this.state.propertyIncidentalOccupancies === 'Main Dwelling' ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'Main Dwelling' } })}
            >
              <label className="label-segmented" htmlFor="propertyIncidentalOccupancies">
                <input
                  type="radio"
                  name="propertyIncidentalOccupancies"
                  onChange={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'Main Dwelling' } })}
                  value="Main Dwelling"
                />
                <span>Main Dwelling</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.propertyIncidentalOccupancies === 'Other Structures' ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'Other Structures' } })}
            >
              <label className="label-segmented" htmlFor="propertyIncidentalOccupancies">
                <input
                  type="radio"
                  name="propertyIncidentalOccupancies"
                  onChange={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'Other Structures' } })}
                  value="Other Structures"
                />
                <span>Other Structures</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.propertyIncidentalOccupancies === 'None' ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'None' } })}
            >
              <label className="label-segmented" htmlFor="propertyIncidentalOccupancies">
                <input
                  type="radio"
                  name="propertyIncidentalOccupancies"
                  onChange={() => this.handleChange({ target: { name: 'propertyIncidentalOccupancies', value: 'None' } })}
                  value="None"
                />
                <span>None</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group switch">
          <label
            htmlFor="sinkholeCoverage"
            onClick={() => this.handleChange({
              target: {
                name: 'sinkholeCoverage',
                value: !this.state.sinkholeCoverage,
              },
            })}
          >
            Do you want sinkhole coverage?
            <input
              type="checkbox"
              name="sinkholeCoverage"
              checked={this.state.sinkholeCoverage}
              onChange={() => this.handleChange({
                target: {
                  name: 'sinkholeCoverage',
                  value: !this.state.sinkholeCoverage,
                },
              })}
            />
            <div className="switch-div" />
          </label>
        </div>
      </div>
      <div className="form-group survey-wrapper" role="group">
        <h4 className="section-group-header"><i className="fa fa-money"></i> Deductibles</h4>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            All Other Perils Deductible
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-3${this.state.allOtherPerils === 500 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'allOtherPerils', value: 500 } })}
            >
              <label className="label-segmented" htmlFor="allOtherPerils">
                <input
                  type="radio"
                  name="allOtherPerils"
                  onChange={() => this.handleChange({ target: { name: 'allOtherPerils', value: 500 } })}
                  value={500}
                />
                <span>$500</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.allOtherPerils === 1000 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'allOtherPerils', value: 1000 } })}
            >
              <label className="label-segmented" htmlFor="allOtherPerils">
                <input
                  type="radio"
                  name="allOtherPerils"
                  onChange={() => this.handleChange({ target: { name: 'allOtherPerils', value: 1000 } })}
                  value={1000}
                />
                <span>$1000</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.allOtherPerils === 2500 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'allOtherPerils', value: 2500 } })}
            >
              <label className="label-segmented" htmlFor="allOtherPerils">
                <input
                  type="radio"
                  name="allOtherPerils"
                  onChange={() => this.handleChange({ target: { name: 'allOtherPerils', value: 2500 } })}
                  value={2500}
                />
                <span>$2500</span>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group segmented" role="group">
          <label className="group-label label-segmented">
            Hurricane Deductible
            <input
              type="text"
              value={(this.state.hurricane / 100) * this.state.dwellingAmount}
              readOnly
            />
          </label>
          <div className="segmented-answer-wrapper">
            <div
              className={`radio-column-3${this.state.hurricane === 2 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'hurricane', value: 2 } })}
            >
              <label className="label-segmented" htmlFor="hurricane">
                <input
                  type="radio"
                  name="hurricane"
                  onChange={() => this.handleChange({ target: { name: 'hurricane', value: 2 } })}
                  value={2}
                />
                <span>2% of Dwelling Limit</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.hurricane === 5 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'hurricane', value: 5 } })}
            >
              <label className="label-segmented" htmlFor="hurricane">
                <input
                  type="radio"
                  name="hurricane"
                  onChange={() => this.handleChange({ target: { name: 'hurricane', value: 5 } })}
                  value={5}
                />
                <span>5% of Dwelling Limit</span>
              </label>
            </div>
            <div
              className={`radio-column-3${this.state.hurricane === 10 ? ' selected' : ''}`}
              onClick={() => this.handleChange({ target: { name: 'hurricane', value: 10 } })}
            >
              <label className="label-segmented" htmlFor="hurricane">
                <input
                  type="radio"
                  name="hurricane"
                  onChange={() => this.handleChange({ target: { name: 'hurricane', value: 10 } })}
                  value={10}
                />
                <span>10% of Dwelling Limit</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>
          {this.state.updated ? 'update' : 'next'}
        </button>
      </div>
    </form>
    );
  }
}

export default CustomizeQuote;
