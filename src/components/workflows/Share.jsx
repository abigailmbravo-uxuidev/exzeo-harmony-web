import React, { Component } from 'react';

// import Stepper from './workflows/Stepper';

class Share extends Component {
  state = {
    // Some state will go here
  };
  render() {
    return (
      <div className="fade-in">
        <div className="form-group">
          <h4>Coverages</h4>
          <dl>
                  <dt>Dwelling</dt>
                  <dd>$100,000</dd></dl>
          <dl>
                  <dt>Other Structures</dt>
                  <dd>$100,000</dd></dl>
          <dl>
                  <dt>Personal Property</dt>
                  <dd>$50000</dd></dl>
          <dl>
                  <dt>Personal Property Replacement Cost</dt>
                  <dd>Yes</dd></dl>
          <dl>
                  <dt>Loss Of Use</dt>
                  <dd>$10,000</dd></dl>
          <dl>
                  <dt>Personal Liability</dt>
                  <dd>$100,000</dd></dl>
          <dl>
                  <dt>Medical Payments</dt>
                  <dd>$2,000</dd></dl>
          <dl>
                  <dt>Mold Property</dt>
                  <dd>$10,000</dd></dl>
          <dl>
                  <dt>Mold Liability</dt>
                  <dd>$50,000</dd></dl>
          <dl>
                  <dt>Ordinance or Law</dt>
                  <dd>$25,000</dd></dl>
          <dl>
                  <dt>Property Incidental Occupancies</dt>
                  <dd>Yes</dd></dl>
          <dl>
                  <dt>Sinkhole Coverage</dt>
                  <dd>Yes</dd></dl>
          <dl>
                  <dt>All Other Perils</dt>
                  <dd>$500</dd></dl>
          <dl>
                  <dt>Hurricane</dt><dd>$2,000</dd></dl>
          <dl>
                  <dt>Sinkhole Deductible</dt><dd>Yes</dd></dl>
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit " form="survey">Customize</button>
          <button className="btn btn-primary" type="submit" form="survey">share</button>
          <button className="btn btn-primary" type="submit" form="survey">next</button>
        </div>
      </div>
    );
  }
}


export default Share;
