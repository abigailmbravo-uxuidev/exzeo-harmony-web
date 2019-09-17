import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Loader } from '@exzeo/core-ui';

import * as appStateActions from '../../state/actions/appStateActions';
import NoPolicyResultsConnect from './NoPolicyResults';
import { getSearchType } from './searchUtils';
import { createQuote } from '../../state/actions/quoteState.actions';

const onKeypressQuote = (event, quote, props) => {
  if (event.charCode === 13) {
    props.handleSelectQuote(quote, props);
  }
};

const onKeypressPolicy = (event, policy, props) => {
  if (event.charCode === 13) {
    // handleSelectPolicy(policy, props);
  }
};

export const SearchResults = props => {
  const { policyResults } = props;
  if (props.search && props.search.searchType === 'policy') {
    return (
      <ul className="policy-list">
        {props.search && props.search.isLoading && <Loader />}
        {policyResults &&
          policyResults.policies &&
          policyResults.policies.length > 0 &&
          policyResults.policies.map((policy, index) => (
            <li
              key={index}
              tabIndex={0}
              onKeyPress={event => onKeypressPolicy(event, policy, props)}
              id={policy.PolicyID}
              className="card"
            >
              <Link
                to={{ pathname: `/policy/${policy.policyNumber}/policyHolder` }}
                className={`${policy.policyNumber +
                  policy.property.physicalAddress.address1}`}
              >
                <div className="icon-name">
                  <i className="card-icon fa fa-user-circle" />
                  <h4
                    title={
                      policy.policyHolders && policy.policyHolders.length > 0
                        ? `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`
                        : ''
                    }
                  >
                    {policy.policyHolders[0] &&
                      `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}
                  </h4>
                </div>
                <section>
                  <ul
                    id="policy-search-results"
                    className="policy-search-results"
                  >
                    <li className="header">
                      <span className="policy-no">Policy No.</span>
                      <span className="property-address">Property Address</span>
                      <span className="policy-status">Policy Status</span>
                      <span className="effective-date">Effective Date</span>
                    </li>
                    <li>
                      <span className="policy-no">{policy.policyNumber}</span>
                      <span className="property-address">{`${policy.property.physicalAddress.address1}
                      ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
                      ${policy.property.physicalAddress.zip}`}</span>
                      <div className="policy card-detail-wrapper">
                        <span className="policy-status">{policy.status}</span>
                        <span className="effective-date">
                          {moment
                            .utc(policy.effectiveDate)
                            .format('MM/DD/YYYY')}
                        </span>
                      </div>
                    </li>
                  </ul>
                </section>
              </Link>
            </li>
          ))}
        {props.search &&
          props.search.hasSearched &&
          policyResults &&
          policyResults.policies &&
          policyResults.policies.length === 0 && <NoPolicyResultsConnect />}
      </ul>
    );
  }
  if (props.searchType === 'address') {
    const addresses = props.results;

    const onKeyPress = (event, address) => {
      if (event.charCode === 13) {
        props.handleSelectAddress(address, props);
      }
    };

    return (
      <div>
        <ul className="results result-cards" data-test="search-results">
          {addresses
            ? addresses.map((address, index) => (
                <li
                  id={address.id}
                  key={index}
                  tabIndex={'0'}
                  onKeyPress={event => onKeyPress(event, address)}
                >
                  <a onClick={() => props.handleSelectAddress(address, props)}>
                    <i className="card-icon fa fa-map-marker" />
                    <section>
                      <h4>{address.physicalAddress.address1}</h4>
                      <p>
                        {address.physicalAddress.city},{' '}
                        {address.physicalAddress.state}{' '}
                        {address.physicalAddress.zip}
                      </p>
                    </section>
                    <i className="fa fa-chevron-circle-right" />
                  </a>
                </li>
              ))
            : null}
          <div>
            <small>
              <p>
                If you don't see your address in the list provided, try entering
                less address information to see if that improves your search
                results. Please note, at this time we are only writing single
                family dwellings in the state of Florida.
              </p>
              <p>
                If you still have problems finding an address, please{' '}
                <a href="tel:844-289-7968">
                  <strong>call us</strong>
                </a>{' '}
                and one of our representatives will be glad to help you.
              </p>
            </small>
          </div>
        </ul>
      </div>
    );
  }
  if (props.searchType === 'quote') {
    const quotes = props.results;
    return (
      <ul className="quote-list" data-test="quote-list">
        {quotes &&
          quotes.map((quote, index) => (
            <li
              key={index}
              tabIndex={0}
              onKeyPress={event => onKeypressQuote(event, quote, props)}
              id={quote._id}
              className="card"
              onClick={() => props.handleSelectQuote(quote, props)}
            >
              <div className="icon">
                <i className="card-icon fa fa-user-circle" />
                <span>{quote.product === 'AF3' ? 'Flood' : quote.product}</span>
              </div>
              <section>
                <span className="quote-no">{quote.quoteNumber}</span>
                <h4
                  className="name"
                  title={
                    quote.policyHolders && quote.policyHolders.length > 0
                      ? `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`
                      : ''
                  }
                >
                  {quote.policyHolders[0] &&
                    `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`}
                  <i className="fa fa-chevron-circle-right" />
                </h4>
                <span className="property-address">{`${quote.property.physicalAddress.address1}
                        ${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state}
                        ${quote.property.physicalAddress.zip}
                        `}</span>

                <div className="quote card-detail-wrapper">
                  <span className="quote-state">{quote.quoteState}</span>
                  <div className="sub-detail-wrapper">
                    <span className="effective-date">
                      <label>Effective</label>
                      {moment.utc(quote.effectiveDate).format('MM/DD/YYYY')}
                    </span>
                    <span className="started-on">
                      <label>Started</label>
                      {moment.utc(quote.createdAt).format('MM/DD/YYYY')}
                    </span>
                    <span className="premium">
                      <strong>
                        $ {quote.rating ? quote.rating.totalPremium : '-'}
                      </strong>
                    </span>
                  </div>
                </div>
              </section>
            </li>
          ))}
      </ul>
    );
  }

  return <span />;
};

SearchResults.propTypes = {
  policyResults: PropTypes.shape(),
  search: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      dontSeeAddress: PropTypes.bool
    })
  }),
  handleSelect: PropTypes.func,
  handleSelectQuote: PropTypes.func
};

const mapStateToProps = state => ({
  appState: state.appState,
  search: state.search,
  policyResults: state.service.policyResults,
  searchType: getSearchType(),
  results: state.search.results
});

const mapDispatchToProps = dispatch => ({
  createQuote: bindActionCreators(createQuote, dispatch),
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
