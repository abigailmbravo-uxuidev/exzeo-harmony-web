import React from 'react';
import { bindActionCreators } from 'redux';
import SearchConnect from '../components/Search/Search';
import { connect } from 'react-redux';
import BaseConnect from './Base';
import * as serviceActions from '../actions/serviceActions';
import * as searchActions from '../actions/searchActions';

const PolicySearch = props => <BaseConnect {...props} ><div className="workflow" role="article">
  <div className={'route search'}>
    <SearchConnect />
  </div>
</div></BaseConnect>;

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyState: state.policyState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicySearch);
