import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;

  const userRole = JSON.parse(atob(token.split('.')[1])).role; // Decode token to get the role

  if (role && userRole !== role) return <Navigate to="/user" />;

  return children;
};

export default PrivateRoute;