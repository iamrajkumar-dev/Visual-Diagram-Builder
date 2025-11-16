import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import type { UserRole } from "../types/auth";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { appUser, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="center-loader" style={{ height: "100vh" }}>
        <div className="loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }

  if (!appUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && appUser.role && !allowedRoles.includes(appUser.role)) {
    console.warn(`Access denied for role: ${appUser.role}`);
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
