import React, {Component} from 'react';
import Footer from '../common/Footer';

// import Stepper from './workflows/Stepper';
const CoverageDetails = () => (
  <div className="CoverageDetails detail-group">
    <h4>Coverages</h4>
    <button className="btn btn-link edit-btn" type="" form=""><i className="fa fa-pencil"></i>Edit</button>
    <section className="summary-section">
      <dl>
        <dt>
          <span>A</span>Dwelling</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>
          <span>B</span>
          Other Structures</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>
          <span>C</span>Personal Property</dt>
        <dd>$50000</dd>
      </dl>
      <dl>
        <dt>Personal Property Replacement Cost</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Loss Of Use</dt>
        <dd>$10,000</dd>
      </dl>
      <dl>
        <dt>Personal Liability</dt>
        <dd>$100,000</dd>
      </dl>
      <dl>
        <dt>Medical Payments</dt>
        <dd>$2,000</dd>
      </dl>
    </section>
  </div>
)
const RatingDetails = () => (
  <div className="RatingDetails detail-group">
    <h4>Rating</h4>
    <button className="btn btn-link edit-btn" type="" form=""><i className="fa fa-pencil"></i>Edit</button>
    <section className="summary-section">
      <dl>
        <dt>Mold Property</dt>
        <dd>$10,000</dd>
      </dl>
      <dl>
        <dt>Mold Liability</dt>
        <dd>$50,000</dd>
      </dl>
      <dl>
        <dt>Ordinance or Law</dt>
        <dd>$25,000</dd>
      </dl>
      <dl>
        <dt>Property Incidental Occupancies</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Hurricane</dt>
        <dd>$2,000</dd>
      </dl>
      <dl>
        <dt>Sinkhole Coverage</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>Sinkhole Deductible</dt>
        <dd>Yes</dd>
      </dl>
      <dl>
        <dt>All Other Perils</dt>
        <dd>$500</dd>
      </dl>
    </section>
  </div>
)
class Share extends Component {
  state = {
    // Some state will go here
  };
  render() {
    return (
      <div className="fade-in">
        <div className="detail-content-wrapper ">
          <aside>
            <dl>
              <dt>Quote number</dt>
              <dd>TTIC-HO3-12345</dd>
            </dl>
            <dl>
              <dt>Address</dt>
              <dd>123 Main Street</dd>
              <dd>Fort lauderdale, FL 12345</dd>
            </dl>
            <dl>
              <dt>Year Built</dt>
              <dd>2000</dd>
            </dl>
          </aside>
          <div className="detail-wrapper">
            <CoverageDetails/>
            <RatingDetails/>
          </div>
        </div>
        <div className="workflow-steps">

          <button className="btn btn-primary" type="submit" form="survey">share</button>
          <button className="btn btn-primary" type="submit" form="survey">next</button>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Share;
