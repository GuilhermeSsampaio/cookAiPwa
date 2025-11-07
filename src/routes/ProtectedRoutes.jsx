import React from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  return user ? children : <Navigate to={"/login"} replace />;
}
