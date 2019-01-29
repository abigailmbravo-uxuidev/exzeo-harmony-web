import React from 'react';

import PolicyWorkflow from '../components/PolicyWorkflow/PolicyWorkflow';
import AppWrapper from '../components/AppWrapper';

const Policy = ({ auth, location, match }) => (
  <AppWrapper
    errorRedirectUrl={location.pathname}
    logout={auth.logout}
    match={match}
    render={() => (
      <PolicyWorkflow auth={auth} match={match} location={location}/>
    )}
  />
);

export default Policy;
