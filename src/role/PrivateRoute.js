import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ roles, children }) => {
  // const { user } = useAuth();
  const user = JSON.parse(localStorage.getItem('userData'));
  const role = user?.role;

  if (!user || !roles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
