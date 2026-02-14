import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import GoogleCallbackPage from "../pages/GoogleCallbackPage";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/SettingsPage";
import BookPage from "../pages/BookPage";
import SearchPage from "../pages/SearchPage";
import Layout from "../components/layout/Layout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<UserPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/book" element={<BookPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
