import React from 'react';
import { Loader } from '@exzeo/core-ui';
import { useAuth0 } from './context/auth-context';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));

function App() {
  const { isAuthenticated, loading } = useAuth0();
  return (
    <React.Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </React.Suspense>
  );
}

export default App;
