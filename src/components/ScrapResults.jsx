import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Recipe from "./Recipe";
import {
  ArrowsExpand,
  BookmarkHeart,
  XCircle,
  XCircleFill,
} from "react-bootstrap-icons";
import { useSaveRecipe } from "../hooks/useSaveRecipes";

export default function ScrapResults({ data }) {
  const [expanded, setExpanded] = useState(false);
  // Sempre mostra o último scrap salvo, a não ser que o usuário limpe explicitamente
  const [resultContent, setResultContent] = useState(() => {
    try {
      if (data !== undefined && data !== null && data !== "") {
        localStorage.setItem("lastScrapRecipe", JSON.stringify(data));
        return data;
      }
      const stored = localStorage.getItem("lastScrapRecipe");
      return stored ? JSON.parse(stored) : "";
    } catch {
      return "";
    }
  });

  // Se data mudar para um valor válido, atualiza o localStorage e o conteúdo
  useEffect(() => {
    if (data !== undefined && data !== null && data !== "") {
      setResultContent(data);
      try {
        localStorage.setItem("lastScrapRecipe", JSON.stringify(data));
      } catch {}
    }
  }, [data]);
  const { saveRecipe, showLoginModal, handleLogin, handleCancel } =
    useSaveRecipe();

  const handleCloseRecipe = () => setExpanded(false);

  // Limpa o resultado e o localStorage explicitamente
  const cleanRecipe = () => {
    setResultContent("");
    try {
      localStorage.removeItem("lastScrapRecipe");
    } catch {}
  };

  if (!resultContent || !resultContent.content) {
    return (
      <div style={styles.empty}>
        <span style={markdownStyles.body}>Nenhuma receita encontrada.</span>
      </div>
    );
  }

  return (
    <>
      <div style={styles.actions}>
        <span
          role="img"
          aria-label="fechar"
          style={{ cursor: "pointer", fontSize: 20, color: "#ed4f27ff" }}
          onClick={cleanRecipe}
        >
          <XCircleFill size={24} />
        </span>
        <button style={styles.actionBtn} onClick={() => setExpanded(true)}>
          <span
            role="img"
            aria-label="expandir"
            style={{ fontSize: 20, color: "#ed4f27ff" }}
          >
            <ArrowsExpand size={24} />
          </span>
          <span style={styles.actionText}>Expandir</span>
        </button>
        <button
          style={styles.actionBtn}
          onClick={() => saveRecipe(resultContent)}
        >
          <span
            role="img"
            aria-label="salvar"
            style={{ fontSize: 20, color: "#ed4f27ff" }}
          >
            <BookmarkHeart size={28} />
          </span>
          <span style={styles.actionText}>Salvar</span>
        </button>
      </div>
      <div style={styles.card}>
        <ReactMarkdown components={markdownComponents}>
          {resultContent?.content || ""}
        </ReactMarkdown>
      </div>
      <Recipe
        visible={expanded}
        onClose={handleCloseRecipe}
        data={resultContent?.content || ""}
      />
      {/* Modal de Login */}
      {showLoginModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalLogin}>
            <div style={styles.modalLoginTitle}>
              Faça login para salvar receitas
            </div>
            <div style={styles.modalLoginActions}>
              <button style={styles.modalLoginBtn} onClick={handleLogin}>
                Login
              </button>
              <button style={styles.modalLoginBtn} onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const markdownComponents = {
  h2: ({ ...props }) => <h2 style={markdownStyles.heading2} {...props} />,
  strong: ({ ...props }) => <strong style={markdownStyles.strong} {...props} />,
  p: ({ ...props }) => <p style={markdownStyles.body} {...props} />,
};

const markdownStyles = {
  body: { color: "#444", fontSize: 15 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};

const styles = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    maxHeight: "60vh",
    overflowY: "auto",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    margin: "8px 16px 0 16px",
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
  empty: {
    padding: 32,
    textAlign: "center",
    color: "#aaa",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 3000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalLogin: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 32,
    boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  modalLoginTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 24,
  },
  modalLoginActions: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  modalLoginBtn: {
    backgroundColor: "#ed4f27ff",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },
};
