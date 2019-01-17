import React from 'react';
import ShowPremium from './ShowPremium';

const DetailHeader = ({ activeTask, handleRecalc, isLoading, quote }) => {
  const useAnimationForPremium = activeTask === 'askToCustomizeDefaultQuote';
  return (
    <div className="detailHeader">
      <section id="quoteDetails">
        <dl>
          <div>
            <dt className="fade">Quote Number</dt>
            <dd className="fade">{quote.rating ? quote.quoteNumber : '-'}</dd>
          </div>
        </dl>
      </section>
      <section id="propertyDetails" className="propertyDetails">
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
      <section id="yearBuilt" className="yearBuilt">
        <dl>
          <div>
            <dt className="fade">Year Built</dt>
            <dd className="fade">{quote.property.yearBuilt}</dd>
          </div>
        </dl>
      </section>
      <section id="constructionType" className="constructionType">
        <dl>
          <div>
            <dt className="fade">Construction Type</dt>
            <dd className="fade">{quote.property.constructionType}</dd>
          </div>
        </dl>
      </section>
      <section id="coverageDetails">
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
      <section id="premium" className="premium">
        <dl>
          <div>
            <dt className="fade">Premium</dt>
            <dd className="fade">
              {(quote.rating && !this.props.appState.isRecalc) &&
                <ShowPremium premium={quote.rating.totalPremium} useAnimation={useAnimationForPremium} />
              }
            </dd>
          </div>
          {this.props.appState.isRecalc &&
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
