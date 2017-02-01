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
          <p><label>Dwelling:</label> $100,000</p>
          <p><label>Other Structures:</label> $100,000</p>
          <p><label>Personal Property:</label> $50000</p>
          <p><label>Personal Property Replacement Cost:</label> Yes</p>
          <p><label>Loss Of Use:</label> $10,000</p>
          <p><label>Personal Liability:</label> $100,000</p>
          <p><label>Medical Payments:</label> $2,000</p>
          <p><label>Mold Property:</label> $10,000</p>
          <p><label>Mold Liability:</label> $50,000</p>
          <p><label>Ordinance or Law:</label> 25,000</p>
          <p><label>Property Incidental Occupancies:</label> Yes</p>
          <p><label>Sinkhole Coverage:</label> Yes</p>
          <p><label>All Other Perils:</label> $500</p>
          <p><label>Hurricane:</label> 2,000</p>
          <p><label>Sinkhole Deductible:</label> Yes</p>
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
