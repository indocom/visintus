import React from 'react';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { ItinProvider } from './itin';

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ItinProvider>{children}</ItinProvider>
      </UserProvider>
    </AuthProvider>
  );
}
export default AppProviders;
