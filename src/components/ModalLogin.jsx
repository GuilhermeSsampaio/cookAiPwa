import React from "react";

export default function ModalLogin({ visible, onLogin, onCancel }) {
  if (!visible) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalText}>
          Você precisa estar logado para acessar suas receitas salvas.
        </div>
        <button style={styles.loginButton} onClick={onLogin}>
          <span style={styles.loginButtonText}>Fazer Login</span>
        </button>
        <button style={styles.cancelButton} onClick={onCancel}>
          <span style={styles.cancelButtonText}>Cancelar</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4000,
  },
  modalContainer: {
    width: "80vw",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#ed4f27ff",
    padding: "12px 32px",
    borderRadius: 8,
    marginBottom: 8,
    border: "none",
    cursor: "pointer",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 8,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  cancelButtonText: {
    color: "#ed4f27ff",
    fontSize: 14,
  },
};
