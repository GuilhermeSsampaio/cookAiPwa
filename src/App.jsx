import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthProvider";
import AppRoutes from "./routes/routes";
import { ToastContainer } from "react-toastify";

import React, { useEffect, useState } from "react";

function OfflineBar() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const handle = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", handle);
    window.addEventListener("offline", handle);
    return () => {
      window.removeEventListener("online", handle);
      window.removeEventListener("offline", handle);
    };
  }, []);
  if (!isOffline) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        background: "#ed4f27",
        color: "#fff",
        textAlign: "center",
        zIndex: 9999,
        fontWeight: "bold",
        fontSize: 15,
        padding: "7px 0",
        letterSpacing: 1,
        boxShadow: "0 2px 8px #ed4f2740",
      }}
    >
      Modo offline: algumas funções podem estar limitadas
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OfflineBar />
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
