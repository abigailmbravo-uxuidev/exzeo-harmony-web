import React from 'react';
import { Route } from 'react-router-dom';

import { userResources } from '../../../utilities/userResources';
import AppWrapper from '../../../components/AppWrapper';

import SearchAddress from './SearchAddress';
import SearchQuote from './SearchQuote';
import SearchPolicy from './SearchPolicy';

const PermissionDenied = () => (
  <div className="disabled-message">
    <h3>Permission Denied</h3>
    <p>this agency is no longer allowed to retrieve quotes</p>
  </div>
);

const Search = ({
  auth,
  agency,
  createQuote,
  match,
  retrieveQuote,
  userProfile
}) => {
  const { enableQuote, enableRetrieve } = userResources(userProfile, agency);

  return (
    <AppWrapper auth={auth} match={match}>
      <div className="route">
        <div className="flex grow">
          <div className="search route-content">
            <Route
              exact
              path={`${match.url}/address`}
              render={props => {
                return enableQuote ? (
                  <SearchAddress
                    {...props}
                    createQuote={createQuote}
                    userProfile={userProfile}
                  />
                ) : (
                  <PermissionDenied />
                );
              }}
            />
            <Route
              exact
              path={`${match.url}/retrieve`}
              render={props => {
                return enableRetrieve ? (
                  <SearchQuote
                    {...props}
                    retrieveQuote={retrieveQuote}
                    userProfile={userProfile}
                  />
                ) : (
                  <PermissionDenied />
                );
              }}
            />
            <Route
              exact
              path={`${match.url}/policy`}
              render={props => (
                <SearchPolicy {...props} userProfile={userProfile} />
              )}
            />
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default Search;
