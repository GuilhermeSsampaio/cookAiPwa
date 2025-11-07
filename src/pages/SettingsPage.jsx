import React, { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">
            <i className="bi bi-gear-fill me-2 text-primary"></i>
            Configurações
          </h2>

          <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div>
                <i className="bi bi-bell-fill me-2 text-primary"></i>
                Notificações
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="notificationSwitch"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
              </div>
            </div>

            <div className="list-group-item d-flex justify-content-between align-items-center p-3">
              <div>
                <i className="bi bi-moon-stars-fill me-2 text-primary"></i>
                Modo escuro
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="darkModeSwitch"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
