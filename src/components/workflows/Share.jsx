import React, { Component } from 'react';

// import Stepper from './workflows/Stepper';

class Share extends Component {
  state = {
    // Some state will go here
  };
  render() {
    return (
      <div>
        <div>
          <p>Coverages</p>
          <p>Dwelling: $100,000</p>
          <p>Other Structures: $100,000</p>
          <p>Personal Property: $50000</p>
          <p>Personal Property Replacement Cost: Yes</p>
          <p>Loss Of Use: $10,000</p>
          <p>Personal Liability: $100,000</p>
          <p>Medical Payments: $2,000</p>
          <p>Mold Property: $10,000</p>
          <p>Mold Liability: $50,000</p>
          <p>Ordinance or Law: 25,000</p>
          <p>Property Incidental Occupancies: Yes</p>
          <p>Sinkhole Coverage: Yes</p>
          <p>All Other Perils: $500</p>
          <p>Hurricane: 2,000</p>
          <p>Sinkhole Deductible: Yes</p>
        </div>
        <div className="workflow-steps">
          <button className="btn btn-primary" type="submit" form="survey">Customize</button>
          <button className="btn btn-primary" type="submit" form="survey">share</button>
          <button className="btn btn-primary" type="submit" form="survey">next</button>
        </div>
      </div>
    );
  }
}


export default Share;
