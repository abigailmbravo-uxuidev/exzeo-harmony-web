/* eslint import/no-mutable-exports:0 jsx-a11y/label-has-for:0 */
import React, { Component, PropTypes } from 'react';

// import Stepper from './workflows/Stepper';

class UWQuestions extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }
  state = {
    // Some state will go here
  }

  handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    this.context.router.push('/workflow/customize');
  }

  render() {
    return (
      <form className="fade-in">
        <div className="form-group survey-wrapper" role="group">
          <div className="form-group segmented monthsOccupied  " role="group">
            <label className="group-label label-segmented">How many months a year does the owner live in the home?</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-4">
                <label className="label-segmented" htmlFor="0"><input type="radio" value="0-3" name="monthsOccupied" />
                  <span>0-3</span>
                </label>
              </div>
              <div className="radio-column-4">
                <label className="label-segmented" htmlFor="1"><input type="radio" value="4-6" name="monthsOccupied" />
                  <span>4-6</span>
                </label>
              </div>
              <div className="radio-column-4">
                <label className="label-segmented" htmlFor="2"><input type="radio" value="7-9" name="monthsOccupied" />
                  <span>7-9</span>
                </label>
              </div>
              <div className="radio-column-4">
                <label className="label-segmented" htmlFor="3"><input type="radio" value="10+" name="monthsOccupied" />
                  <span>10+</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group segmented floodCoverage  " role="group">
            <label className="group-label label-segmented">Does this property have a separate insurance policy covering flood losses?</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="floodCoverage" />
                  <span>Yes</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="1"><input type="radio" value="No" name="floodCoverage" />
                  <span>No</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="2"><input type="radio" value="Unsure" name="floodCoverage" />
                  <span>Unsure</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group segmented rented  " role="group">
            <label className="group-label label-segmented">Is the home or any structures on the property ever rented?</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="rented" />
                  <span>Yes</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="1"><input type="radio" value="Occasionally" name="rented" />
                  <span>Occasionally</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="2"><input type="radio" value="Never" name="rented" />
                  <span>Never</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group segmented fourPointUpdates  " role="group">
            <label className="group-label label-segmented">Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="0"><input type="radio" value="Yes" name="fourPointUpdates" />
                  <span>Yes</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="1"><input type="radio" value="No" name="fourPointUpdates" />
                  <span>No</span>
                </label>
              </div>
              <div className="radio-column-3">
                <label className="label-segmented" htmlFor="2"><input type="radio" value="Unknown" name="fourPointUpdates" />
                  <span>Unknown</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-group segmented previousClaims  " role="group">
            <label className="group-label label-segmented">How many claims in the past 5 years?</label>
            <div className="segmented-answer-wrapper">
              <div className="radio-column-5">
                <label className="label-segmented" htmlFor="0"><input type="radio" value="0" name="previousClaims" />
                  <span>0</span>
                </label>
              </div>
              <div className="radio-column-5">
                <label className="label-segmented" htmlFor="1"><input type="radio" value="1" name="previousClaims" />
                  <span>1</span>
                </label>
              </div>
              <div className="radio-column-5">
                <label className="label-segmented" htmlFor="2"><input type="radio" value="2" name="previousClaims" />
                  <span>2</span>
                </label>
              </div>
              <div className="radio-column-5">
                <label className="label-segmented" htmlFor="3"><input type="radio" value="3+" name="previousClaims" />
                  <span>3+</span>
                </label>
              </div>
              <div className="radio-column-5">
                <label className="label-segmented" htmlFor="4"><input type="radio" value="Unknown" name="previousClaims" />
                  <span>Unknown</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="Demographics" onClick={this.handleSubmit}>next</button>
        </div>
      </form>
    );
  }
}

export default UWQuestions;
