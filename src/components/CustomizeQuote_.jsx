/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/label-has-for */
import React, { Component } from 'react';

// Can this all be imported from cg? Initial Values from the quote?
const dwelling = {
  min: 10000,
  amount: 12000,
  max: 20000,
};

class CustomizeQuote extends Component {
  state = {
    dwellingAmount: dwelling.amount,
    otherStructuresAmount: 0,
    personalPropertyReplacementCostCoverage: false,
    personalPropertyAmount: 0,
    personalLiability: 100000,
    moldProperty: 10000,
    moldLiability: 50000,
    ordinanceOrLaw: 0.25,
  }
  handleChange = (event) => {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    console.log(this.state.questions); // eslint-disable-line
  }
  render() {
    return (
      <div className="workflow" role="article">
        <div className="fade-in">
          <section>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group" role="group">
                <h2>Coverage Limits</h2>
                <div className="form-group range-component">
                  <label htmlFor="dwellingLimit">
                    Dwelling Limit
                  </label>
                  <div className="range-wrapper">
                    <div className="range-control-wrapper">
                      <span className="range-limit">{Math.ceil(dwelling.min)}</span>
                      <input
                        type="range"
                        name="dwellingAmount"
                        min={Math.ceil(dwelling.min)}
                        max={Math.floor(dwelling.max)}
                        step={1000}
                        value={this.state.dwellingAmount}
                        onChange={this.handleChange}
                      />
                      <span className="range-limit">{Math.floor(dwelling.max)}</span>
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
                      value={this.state.dwellingAmount * this.state.otherStructuresAmount}
                      disabled
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
                      className={`radio-column-4${this.state.otherStructuresAmount === 0.02 ? ' selected' : ''}`}
                      onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.02 } })}
                    >
                      <label className="label-segmented" htmlFor="otherStructuresAmount">
                        <input
                          type="radio"
                          name="otherStructuresAmount"
                          onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.02 } })}
                          value={0.02}
                        />
                        <span>2%</span>
                      </label>
                    </div>
                    <div
                      className={`radio-column-4${this.state.otherStructuresAmount === 0.05 ? ' selected' : ''}`}
                      onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.05 } })}
                    >
                      <label className="label-segmented" htmlFor="otherStructuresAmount">
                        <input
                          type="radio"
                          name="otherStructuresAmount"
                          onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.05 } })}
                          value={0.05}
                        />
                        <span>5%</span>
                      </label>
                    </div>
                    <div
                      className={`radio-column-4${this.state.otherStructuresAmount === 0.10 ? ' selected' : ''}`}
                      onClick={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.10 } })}
                    >
                      <label className="label-segmented" htmlFor="otherStructuresAmount">
                        <input
                          type="radio"
                          name="otherStructuresAmount"
                          onChange={() => this.handleChange({ target: { name: 'otherStructuresAmount', value: 0.10 } })}
                          value={0.10}
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
                        value={this.state.dwellingAmount * this.state.personalPropertyAmount}
                        disabled
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
                        className={`radio-column-4${this.state.personalPropertyAmount === 0.25 ? ' selected' : ''}`}
                        onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.25 } })}
                      >
                        <label className="label-segmented" htmlFor="personalPropertyAmount">
                          <input
                            type="radio"
                            name="personalPropertyAmount"
                            onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.25 } })}
                            value={0.25}
                          />
                          <span>25%</span>
                        </label>
                      </div>
                      <div
                        className={`radio-column-4${this.state.personalPropertyAmount === 0.35 ? ' selected' : ''}`}
                        onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.35 } })}
                      >
                        <label className="label-segmented" htmlFor="personalPropertyAmount">
                          <input
                            type="radio"
                            name="personalPropertyAmount"
                            onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.35 } })}
                            value={0.35}
                          />
                          <span>35%</span>
                        </label>
                      </div>
                      <div
                        className={`radio-column-4${this.state.personalPropertyAmount === 0.50 ? ' selected' : ''}`}
                        onClick={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.50 } })}
                      >
                        <label className="label-segmented" htmlFor="personalPropertyAmount">
                          <input
                            type="radio"
                            name="personalPropertyAmount"
                            onChange={() => this.handleChange({ target: { name: 'personalPropertyAmount', value: 0.50 } })}
                            value={0.50}
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
                    value={this.state.dwellingAmount * 0.1}
                    disabled
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
                    disabled
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
                      value={this.state.ordinanceOrLaw * this.state.dwellingAmount}
                      disabled
                    />
                  </label>
                  <div className="segmented-answer-wrapper">
                    <div
                      className={`radio-column-2${this.state.ordinanceOrLaw === 0.25 ? ' selected' : ''}`}
                      onClick={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 0.25 } })}
                    >
                      <label className="label-segmented" htmlFor="ordinanceOrLaw">
                        <input
                          type="radio"
                          name="ordinanceOrLaw"
                          onChange={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 0.25 } })}
                          value={0.25}
                        />
                        <span>25% of Dwelling Limit</span>
                      </label>
                    </div>
                    <div
                      className={`radio-column-2${this.state.ordinanceOrLaw === 0.5 ? ' selected' : ''}`}
                      onClick={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 0.5 } })}
                    >
                      <label className="label-segmented" htmlFor="ordinanceOrLaw">
                        <input
                          type="radio"
                          name="ordinanceOrLaw"
                          onChange={() => this.handleChange({ target: { name: 'ordinanceOrLaw', value: 0.5 } })}
                          value={0.5}
                        />
                        <span>50% of Dwelling Limit</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="workflow-steps">
                <button className="btn btn-primary" type="submit" form="survey">next</button>
              </div>
            </form>
          </section>

        </div>
      </div>
    );
  }
}

export default CustomizeQuote;
