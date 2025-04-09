// src/ProtectedPage.js
import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

const ProtectedPage = () => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) return <div>Loading...</div>;

  return keycloak.authenticated ? (
    <div>
      <h1>Protected Content</h1>
      <p>Welcome, {keycloak.tokenParsed.preferred_username}!</p>
      <button onClick={() => keycloak.logout()}>Logout</button>
    </div>
  ) : (
    <div>
      <h1>You need to log in to access this page</h1>
      <button onClick={() => keycloak.login()}>Login</button>
    </div>
  );
};

export default ProtectedPage;
