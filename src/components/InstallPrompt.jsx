import React, { useState, useEffect } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Instalação ${outcome}`);
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div
      className="position-fixed bottom-0 start-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className="card shadow-lg" style={{ maxWidth: "300px" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="card-title mb-0">
              <i className="bi bi-download me-2"></i>
              Instalar CookAI
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleDismiss}
              aria-label="Fechar"
            ></button>
          </div>
          <p className="card-text small mb-3">
            Instale nosso app para acesso rápido e funcionalidade offline.
          </p>
          <div className="d-grid gap-2">
            <button onClick={handleInstall} className="btn btn-primary btn-sm">
              <i className="bi bi-cloud-download me-2"></i>
              Instalar Agora
            </button>
            <button
              onClick={handleDismiss}
              className="btn btn-outline-secondary btn-sm"
            >
              Depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
