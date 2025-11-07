import React from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <div>Carregando...</div>;
  return user ? <Outlet /> : <Navigate to={"/login"} replace />;
}
