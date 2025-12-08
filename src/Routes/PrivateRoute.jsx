import React from 'react';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../Hooks/UseAuth';

const PrivateRoute = ({children}) => {
     const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  }

  return children;
};

export default PrivateRoute;