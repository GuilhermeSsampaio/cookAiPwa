import React from "react";
import { XCircle } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";

export default function Recipe({ visible, onClose, data }) {
  if (!visible) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <button style={styles.closeBtn} onClick={onClose}>
            <span style={styles.closeIcon} aria-label="Fechar">
              <XCircle size={34} />
            </span>
          </button>
          <span style={styles.modalTitle}>Receita Completa</span>
          <div style={{ width: 28 }} />
        </div>
        <div style={styles.modalContent}>
          <ReactMarkdown components={markdownComponents}>{data}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

const markdownComponents = {
  h2: ({ ...props }) => <h2 style={markdownStyles.heading2} {...props} />,
  strong: ({ ...props }) => <strong style={markdownStyles.strong} {...props} />,
  p: ({ ...props }) => <p style={markdownStyles.body} {...props} />,
};

const markdownStyles = {
  body: { color: "#444", fontSize: 15, margin: 0 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90vw",
    maxWidth: 500,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottom: "1px solid #eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27ff",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 28,
    color: "#ed4f27ff",
    padding: 0,
  },
  closeIcon: {
    fontSize: 28,
    color: "#ed4f27ff",
  },
  modalContent: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
  },
};
