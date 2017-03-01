import React, { PropTypes } from 'react';

const WorkflowDetails = ({ details }) => (
  <div className="detailHeader">
    {details.map((d, index) => {
      if (!d) {
        return null;
      }
      if (d.name.replace(/\s+/g, '') === 'QuoteNumber') {
        return (<section key={index} id="quoteDetails" className="quoteDetails">
          <dl>
            <div>
              <dt className="fade">{d.name}</dt>
              <dd className="fade">{d.value}</dd>

            </div>
          </dl>
        </section>);
      }
      if (d.name.replace(/\s+/g, '') === 'Address') {
        return (<section key={index} id="propertyDetails" className="propertyDetails">
          <dl>
            <div>
              <dt>{d.name}</dt>
              <dd className="fade">{d.value}</dd>
              <dd className="fade">-</dd>
            </div>
          </dl>
        </section>);
      }
      if (d.name.replace(/\s+/g, '') === 'YearBuilt') {
        return (<section key={index} id="yearBuilt" className="yearBuilt">
          <dl>
            <div>
              <dt className="fade">{d.name}</dt>
              <dd className="fade">{d.value}</dd>
            </div>
          </dl>
        </section>);
      }
      if (d.name.replace(/\s+/g, '') === 'AnnualPremium') {
        return (
          <section key={index} id="premium" className="premium">
            <dl>
              <div>
                <dt className="fade">{d.name}</dt>
                <dd className="fade">{`$ ${d.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</dd>
              </div>
            </dl>
          </section>
        );
      }
      if (d.name.replace(/\s+/g, '') === 'CoverageA') {
        return (
          <section key={index} id="coverageDetails" className="coverageDetails">
            <dl>
              <div>
                <dt className="fade">{d.name}</dt>
                <dd className="fade">{`$ ${d.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</dd>
              </div>
            </dl>
          </section>
        );
      }

      return null;
    })}
  </div>
  );

WorkflowDetails.propTypes = {
    details: PropTypes.array,// eslint-disable-line
};

export default WorkflowDetails;
