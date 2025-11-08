import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Recipe from "./Recipe";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import { userApiHandler } from "../handlers/userApiHandler";
import { ArrowsExpand, BookmarkHeart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { removeItem, setItem } from "../handlers/localStorageHandler";

export default function ScrapResults({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const useApiHandler = apiHandler();
  const userAPI = userApiHandler();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!user) {
      setItem("TempRecipe", JSON.stringify(data));
      setShowLoginModal(true);
      return;
    }

    try {
      const userData = await userAPI.getUserData();
      const userId = userData.id;
      await useApiHandler.saveRecipe(userId, { content: data });
      removeItem("TempRecipe");
      setSavedRecipes([...savedRecipes, data]);
    } catch (e) {
      console.error("Failed to save recipe", e);
    }
  };

  const handleCloseRecipe = () => setExpanded(false);

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleCancel = () => {
    removeItem("TempRecipe");
    setShowLoginModal(false);
  };

  if (!data) {
    return (
      <div style={styles.empty}>
        <span style={markdownStyles.body}>Nenhuma receita encontrada.</span>
      </div>
    );
  }

  return (
    <>
      <div style={styles.actions}>
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
        <button style={styles.actionBtn} onClick={handleSave}>
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
        <ReactMarkdown components={markdownComponents}>{data}</ReactMarkdown>
      </div>
      <Recipe visible={expanded} onClose={handleCloseRecipe} data={data} />
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
