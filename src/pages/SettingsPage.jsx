import React, { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.title}>Configurações</div>
      <div style={styles.item}>
        <span style={styles.label}>Notificações</span>
        <label style={styles.switchLabel}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            style={styles.switch}
          />
          <span
            style={{
              ...styles.thumb,
              backgroundColor: notifications ? "#ed4f27ff" : "#ccc",
            }}
          />
        </label>
      </div>
      <div style={styles.item}>
        <span style={styles.label}>Modo escuro</span>
        <label style={styles.switchLabel}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            style={styles.switch}
          />
          <span
            style={{
              ...styles.thumb,
              backgroundColor: darkMode ? "#ed4f27ff" : "#ccc",
            }}
          />
        </label>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
  },
  switchLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  switch: {
    display: "none",
  },
  thumb: {
    width: 36,
    height: 20,
    borderRadius: 12,
    display: "inline-block",
    marginLeft: 8,
    transition: "background 0.2s",
  },
};
