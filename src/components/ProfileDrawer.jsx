import React from "react";
import { Gear, Person } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function ProfileDrawer({ visible, onClose }) {
  const navigate = useNavigate();
  if (!visible) return null;

  return (
    <div>
      <div style={styles.drawerOverlay} onClick={onClose} />
      <div style={styles.drawer}>
        <div style={styles.drawerTitle}>Perfil</div>
        <button
          style={styles.drawerItem}
          onClick={() => {
            onClose();
            navigate("/user");
          }}
        >
          <span style={styles.icon} role="img" aria-label="user">
            <Person size={24} />
          </span>
          <span style={styles.drawerText}>Meu Perfil</span>
        </button>
        <button
          style={styles.drawerItem}
          onClick={() => {
            onClose();
            navigate("/settings");
          }}
        >
          <span style={styles.icon} role="img" aria-label="settings">
            <Gear size={24} />
          </span>
          <span style={styles.drawerText}>Configurações</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  drawerOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
  },
  drawer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: 260,
    height: "100vh",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingLeft: 24,
    paddingRight: 24,
    boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#ed4f27ff",
  },
  drawerItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    fontSize: 16,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    fontSize: 20,
    color: "#ed4f27ff",
  },
};
