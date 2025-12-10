import React from "react";
import { BookmarkHeart, XCircle } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";

export default function Recipe({
  visible,
  onClose,
  data,
  showSaveButton,
  handleSave,
}) {
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
          {showSaveButton ? (
            <button style={styles.actionBtn} onClick={() => handleSave(data)}>
              <span
                role="img"
                aria-label="salvar"
                style={{ fontSize: 20, color: "#ed4f27ff" }}
              >
                <BookmarkHeart size={28} />
              </span>
              <span style={styles.actionText}>Salvar</span>
            </button>
          ) : null}
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
  a: ({ ...props }) => (
    <a
      style={markdownStyles.link}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
};

const markdownStyles = {
  body: { color: "#444", fontSize: 15, margin: 0 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
  link: {
    color: "#ed4f27ff",
    textDecoration: "underline",
    cursor: "pointer",
  },
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
    gap: 8,
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
  actionBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6a26133",
    borderRadius: 8,
    padding: "6px 12px",
    marginLeft: 8,
    border: "none",
    cursor: "pointer",
  },
  actionText: {
    marginLeft: 6,
    color: "#ed4f27ff",
    fontWeight: "bold",
    fontSize: 15,
  },
};
