import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle } from "react-bootstrap-icons";

export default function RecipeEditor({ visible, onClose, recipe, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || "");
      setContent(recipe.content || "");
    }
  }, [recipe]);

  if (!visible) return null;

  const handleSave = () => {
    onSave({ title, content });
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <button style={styles.closeBtn} onClick={onClose}>
            <span style={styles.closeIcon} aria-label="Fechar">
              <XCircle size={34} />
            </span>
          </button>
          <span style={styles.modalTitle}>Editar Receita</span>
          <button style={styles.saveBtn} onClick={handleSave}>
            <CheckCircle size={28} />
            <span style={styles.saveText}>Salvar</span>
          </button>
        </div>

        <div style={styles.modalContent}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Digite o título da receita"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Conteúdo (Markdown)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              placeholder="Digite o conteúdo da receita em Markdown"
              rows={15}
            />
          </div>
        </div>
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
    maxWidth: 700,
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
    flex: 1,
    textAlign: "center",
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
  saveBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6a26133",
    borderRadius: 8,
    padding: "6px 12px",
    border: "none",
    cursor: "pointer",
    color: "#ed4f27ff",
    gap: 6,
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  modalContent: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: "bold",
    color: "#ed4f27ff",
    fontSize: 14,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 15,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
    fontSize: 14,
    fontFamily: "monospace",
    resize: "vertical",
    boxSizing: "border-box",
  },
};
