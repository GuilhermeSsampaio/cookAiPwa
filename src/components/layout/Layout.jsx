import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import InstallPrompt from "../InstallPrompt";

export default function Layout() {
  return (
    <>
      <Header />
      <InstallPrompt />
      <Outlet />
      <Footer />;
    </>
  );
}
