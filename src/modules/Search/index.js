import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import { Loader } from '@exzeo/core-ui';

import App from '../../components/AppWrapper';
import Search from '../../components/Search/Search';


class QuoteSearch extends Component {
  render() {
    const { agency, auth, isLoading, match, userProfile } = this.props;

    return (
      <App
        agency={agency}
        auth={auth}
        match={match}
        userProfile={userProfile}
        render={() => (
          <div className="workflow" role="article">
            <div className="route">
              {isLoading
                && <Loader />
              }

              {/*{ Search refactor will be replacing these routes }*/}
              <Route exact path={`${match.url}/address`}  render={props => <Search {...props} />} />
              <Route exact path={`${match.url}/retrieve`} render={props => <Search {...props} />} />
              {/*{ ^^^ Search refactor will be replacing these routes ^^^ }*/}

            </div>
          </div>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agency: state.service.agency,
    isLoading: state.appState.isLoading
  }
};

export default connect(mapStateToProps)(QuoteSearch);
