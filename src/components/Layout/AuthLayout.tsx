
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../common/LoadingScreen';

const AuthLayout: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center auth-layout">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
