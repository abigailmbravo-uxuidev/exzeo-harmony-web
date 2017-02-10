import React, { PropTypes } from 'react';

const WorkflowDetails = ({ details }) => (
  <aside>
    <div className="side-panel" role="contentinfo">
      {details.map((d, index) => {
        if (!d) {
          return null;
        }
        if (d.name.replace(/\s+/g, '') === 'AnnualPremium' || d.name.replace(/\s+/g, '') === 'CoverageA' || d.name.replace(/\s+/g, '') === 'CoverageB' || d.name.replace(/\s+/g, '') === 'CoverageC') {
          return (
            <section key={index} className={d.name.replace(/\s+/g, '')}>
              <dl>
                <div>
                  <dt>{d.name}</dt>
                  <dd>{`$ ${d.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</dd>
                </div>
              </dl>
            </section>
          );
        }
        return (
          <section key={index} className={d.name.replace(/\s+/g, '')}>
            <dl>
              <div>
                <dt>{d.name}</dt>
                <dd>{d.value}</dd>
              </div>
            </dl>
          </section>
        );
      })
}
      {/* <section id="premium" className="premium">
          <dl>
            <div>
              <dt>Annual premium</dt>
              <dd>$1000.00</dd>
            </div>
          </dl>
        </section>
        <section id="quoteDetails" className="quoteDetails">
          <dl>
            <div>
              <dt>Quote number</dt>
              <dd>fdsa</dd>
            </div>
          </dl>
        </section>
        <section id="propertyDetails" className="propertyDetails">
          <dl>
            <div>
              <dt>Address</dt>
              <dd>123 Main Street<small>Fort Lauderdale, FL, 12345</small></dd>
            </div>
            <div>
              <dt>Year built</dt>
              <dd>2000</dd>
            </div>
          </dl>
        </section>
        <section id="coverageDetails" className="coverageDetails">
          <dl>
            <div>
              <dt>Coverage A</dt>
              <dd>$10,000.00</dd>
            </div>
            <div>
              <dt>Coverage B</dt>
              <dd>$10,000.00</dd>
            </div>
            <div>
              <dt>Coverage C</dt>
              <dd>$10,000.00</dd>
            </div>
          </dl>
        </section> */}
    </div>
  </aside>
  );

WorkflowDetails.propTypes = {
    details: PropTypes.array,// eslint-disable-line
};

export default WorkflowDetails;
