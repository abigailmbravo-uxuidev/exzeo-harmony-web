import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Loader } from '@exzeo/core-ui';

import App from '../../components/AppWrapper';
import Search from '../../components/Search/Search';


export class QuoteSearch extends Component {
  render() {
    const { auth, isLoading, match } = this.props;

    return (
      <App
        logout={auth.logout}
        match={match}
        render={() => (
          <div className="route">
            {isLoading
              && <Loader />
            }

            {/*{ Search refactor will be replacing these routes }*/}
            <Route exact path={`${match.url}/address`}  render={props => <Search {...props} />} />
            <Route exact path={`${match.url}/retrieve`} render={props => <Search {...props} />} />
            {/*{ ^^^ Search refactor will be replacing these routes ^^^ }*/}

          </div>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.appState.isLoading
  }
};

export default connect(mapStateToProps)(QuoteSearch);
