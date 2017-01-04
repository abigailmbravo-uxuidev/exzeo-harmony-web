import React from 'react';

const WorkflowDetails = ({ details }) => {
  console.log(details);
  return (
    <aside>
      <div className="side-panel" role="contentinfo">
        {
          details.map((d, index) => {
            return d ? (
              <section key={index} className={d.name.replace(/\s+/g, '')}>
                <dl>
                  <div>
                    <dt>{d.name}</dt>
                    <dd>{d.value}</dd>
                  </div>
                </dl>
              </section>
            ) : null;
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
  )
};

export default WorkflowDetails;
