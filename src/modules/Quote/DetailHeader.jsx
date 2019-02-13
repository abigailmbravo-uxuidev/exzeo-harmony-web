import React from 'react';
import ShowPremium from './ShowPremium';

const DetailHeader = ({ activeTask, handleRecalc, isLoading, isRecalc, quote }) => {
  const useAnimationForPremium = activeTask === 'askToCustomizeDefaultQuote';
  return (
    <div className="detailHeader">
      <section id="quoteDetails" data-test="quote-details">
        <dl>
          <div>
            <dt className="fade">Quote Number</dt>
            <dd className="fade">{quote.rating ? quote.quoteNumber : '-'}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyDetails" className="propertyDetails" data-test="property-details">
        <dl>
          <div>
            <dt>Address</dt>
            <dd className="fade">{quote.property.physicalAddress.address1}</dd>
            <dd className="fade">{quote.property.physicalAddress.address2}</dd>
            <dd className="fade">
              {quote.property.physicalAddress.city},&nbsp;
              {quote.property.physicalAddress.state}&nbsp;
              {quote.property.physicalAddress.zip}
            </dd>
          </div>
        </dl>
      </section>
      <section id="yearBuilt" className="yearBuilt" data-test="year-built">
        <dl>
          <div>
            <dt className="fade">Year Built</dt>
            <dd className="fade">{quote.property.yearBuilt}</dd>
          </div>
        </dl>
      </section>
      <section id="constructionType" className="constructionType" data-test="construction-type">
        <dl>
          <div>
            <dt className="fade">Construction Type</dt>
            <dd className="fade">{quote.property.constructionType}</dd>
          </div>
        </dl>
      </section>
      <section id="coverageDetails" data-test="coverage-details">
        <dl>
          <div>
            <dt className="fade">Coverage A</dt>
            <dd className="fade">
              $ {(quote.coverageLimits && (activeTask !== 'askAdditionalCustomerData' && activeTask !== 'askUWAnswers'))
                ? quote.coverageLimits.dwelling.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '--'
              }
            </dd>
          </div>
        </dl>
      </section>
      <section id="premium" className="premium" data-test="premium">
        <dl>
          <div>
            <dt className="fade">Premium</dt>
            <dd className="fade">
              {(quote.rating && !isRecalc) &&
                <ShowPremium premium={quote.rating.totalPremium} useAnimation={useAnimationForPremium} />
              }
              {(!quote.rating || isRecalc) && '$ --'}
            </dd>
          </div>
          {isRecalc &&
            <div className="recalc-wrapper">
              <button
                tabIndex={'0'}
                className="btn btn-primary btn-round btn-sm"
                type="button"
                onClick={handleRecalc}
                disabled={isLoading}
              ><i className="fa fa-refresh" /></button>
            </div>
          }
        </dl>
      </section>
    </div>
  );
};

DetailHeader.propTypes = {};

DetailHeader.defaultProps = {};

export default DetailHeader;
