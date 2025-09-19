import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../api/auth';

// PUBLIC_INTERFACE
export function AuthGuard({ children }) {
  /** Protects routes: redirects to /login when unauthenticated */
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
