import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Loader from '../Common/Loader';

import * as appStateActions from '../../actions/appStateActions';
import NoPolicyResultsConnect from './NoPolicyResults';
import { getSearchType } from './searchUtils';
import { createQuote } from '../../actions/quoteState.actions';

const onKeypressQuote = (event, quote, props) => {
  if (event.charCode === 13) {
    props.handleSelectQuote(quote, props);
  }
};

const onKeypressPolicy = (event, policy, props) => {
  if (event.charCode === 13) {
    // handleSelectPolicy(quote, props);
  }
};

export const SearchResults = (props) => {
  const { policyResults } = props;
  if (props.search && props.search.searchType === 'policy') {
    return (
      <div className="quote-list">
        {props.search && props.search.isLoading && <Loader />}
        {
          policyResults && policyResults.policies && policyResults.policies.length > 0 && policyResults.policies.map((policy, index) => (<div tabIndex={0} onKeyPress={event => onKeypressPolicy(event, policy, props)} id={policy.PolicyID} className="card" key={index}>
            <div className="icon-name">
              <i className="card-icon fa fa-user-circle" />
              <div className="card-name">
                <h4 title={policy.policyHolders && policy.policyHolders.length > 0 ? `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}` : ''}>{policy.policyHolders[0] && `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}</h4>
              </div>
            </div>
            <section>
              <ul id="policy-search-results" className="policy-search-results">
                <li className="header">
                  <span className="policy-no">Policy No.</span>
                  <span className="property-address">Property Address</span>
                  <span className="policy-status">Policy Status</span>
                  <span className="effective-date">Effective Date</span>
                </li>
                <li>
                  <Link to={{ pathname: `/policy/${policy.policyNumber}/policyHolder` }} className={`${policy.policyNumber + policy.property.physicalAddress.address1} row`}>
                    <span className="policy-no">{policy.policyNumber}</span>
                    <span className="property-address">{
                  `${policy.property.physicalAddress.address1}
                      ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
                      ${policy.property.physicalAddress.zip}`
                }</span>
                    <span className="policy-status">{policy.status}</span>
                    <span className="effective-date">{moment.utc(policy.effectiveDate).format('MM/DD/YYYY')}</span>
                  </Link>
                </li>
              </ul>
            </section>
          </div>))
      }
        {
          props.search && props.search.hasSearched && policyResults && policyResults.policies && policyResults.policies.length === 0 && <NoPolicyResultsConnect />
      }
      </div>
    );
  }
  if (props.searchType === 'address'
  //   props.tasks[props.appState.modelName] &&
  //   props.tasks[props.appState.modelName].data &&
  //   props.tasks[props.appState.modelName].data.previousTask &&
  //   props.tasks[props.appState.modelName].data.previousTask.name === 'searchAddress' &&
  //   props.tasks[props.appState.modelName].data.activeTask.name !== 'askToSearchAgain'
  ) {
    const addresses = props.results;// props.tasks[props.appState.modelName].data.previousTask.value.result.IndexResult;

    const onKeyPress = (event, address) => {
      if (event.charCode === 13) {
        props.handleSelectAddress(address, props);
      }
    };

    return (
      <div>
        <ul className="results result-cards">
          {addresses
            ? addresses.map((address, index) => (
              <li id={address.id} key={index} tabIndex={'0'} onKeyPress={event => onKeyPress(event, address)}>
                <a onClick={() => props.handleSelectAddress(address, props)}>
                  <i className="card-icon fa fa-map-marker" />
                  <section>
                    <h4>{address.physicalAddress.address1}</h4>
                    <p>{address.physicalAddress.city}, {address.physicalAddress.state} {address.physicalAddress.zip}</p>
                  </section>
                  <i className="fa fa-chevron-circle-right" />
                </a>
              </li>
            ))
            : null}
          <div>
            <small>
              <p>If you don't see your address in the list provided, try entering less address information to see if that improves your search results. Please note, at this time we are only writing single family dwellings in the state of Florida.</p>
              <p>If you still have problems finding an address, please <a href="tel:844-289-7968"><strong>call us</strong></a> and one of our representatives will be glad to help you.</p>
            </small>
          </div>
        </ul>
      </div>
    );
  }
  if (props.searchType === 'quote') {
    // props.tasks[props.appState.modelName] &&
    // props.tasks[props.appState.modelName].data.activeTask &&
    // props.tasks[props.appState.modelName].data.activeTask.name === 'chooseQuote'
    const quotes = props.results; // props.tasks[props.appState.modelName].data.previousTask.value.result;
    return (
      <div className="quote-list">
        {
        quotes && quotes.map((quote, index) => (<div tabIndex={0} onKeyPress={event => onKeypressQuote(event, quote, props)} id={quote._id} className="card" key={index}>
          <div className="icon-name">
            <i className="card-icon fa fa-user-circle" />
            <h4 title={quote.policyHolders && quote.policyHolders.length > 0 ? `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}` : ''}>{quote.policyHolders[0] && `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`}</h4>
          </div>
          <section>
            <ul>
              <li className="header">
                <span className="quote-no">Quote No.</span>
                <span className="property-address">Property Address</span>
                <span className="quote-state">Quote State</span>
                <span className="effective-date">Effective Date</span>
                <span className="started-on">Started On</span>
                <span className="premium">Premium</span>
              </li>
              <li>
                <a onClick={() => props.handleSelectQuote(quote, props)} >
                  <span className="quote-no">{quote.quoteNumber}</span>
                  <span className="property-address">{`${quote.property.physicalAddress.address1}
                          ${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state}
                          ${quote.property.physicalAddress.zip}
                          `}</span>
                  <div className="quote-detail-wrapper">
                    <span className="quote-state">{quote.quoteState}</span>
                    <span className="effective-date">{moment.utc(quote.effectiveDate).format('MM/DD/YYYY')}</span>
                    <span className="started-on">{moment.utc(quote.createdAt).format('MM/DD/YYYY')}</span>
                    <span className="premium">$ {quote.rating ? quote.rating.totalPremium : '-'}</span>
                  </div>
                </a>
              </li>
            </ul>
          </section>
        </div>))
      }
      </div>
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
  tasks: PropTypes.shape(),
  handleSelect: PropTypes.func,
  handleSelectQuote: PropTypes.func
};

const mapStateToProps = state => ({
  tasks: state.cg,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
