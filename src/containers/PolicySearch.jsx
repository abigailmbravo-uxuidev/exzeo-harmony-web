import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import SearchPolicyConnect from '../components/Search/SearchPolicy';
import { connect } from 'react-redux';
import BaseConnect from './Base';
import * as serviceActions from '../actions/serviceActions';
import * as searchActions from '../actions/searchActions';

export class PolicySearch extends Component {
  componentDidMount() {
    this.props.actions.searchActions.setPolicySearch({ searchType: 'policy' });
  }
  render() {
    return (<BaseConnect {...this.props} ><div className="workflow" role="article">
      <div className={'route search'}>
        <SearchPolicyConnect />
      </div>
    </div></BaseConnect>);
  }
}

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  policyState: state.policyState,
  search: state.search
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PolicySearch);
