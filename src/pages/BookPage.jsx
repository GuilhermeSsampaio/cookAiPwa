import React, { useState, useEffect } from "react";
import RecipesList from "../components/RecipesList";
import { apiHandler } from "../handlers/apiHandler";
import { useAuth } from "../contexts/auth/useAuth";
import ModalLogin from "../components/ModalLogin";
import { useNavigate } from "react-router-dom";
import { usersHandler } from "../handlers/usersHandler";
import { Book, FilePdf } from "react-bootstrap-icons";
import SearchBar from "../components/Searchbar";
import { exportRecipesToPDF } from "../handlers/pdfHandler";

export default function BookPage() {
  const useApiHandler = apiHandler();
  const useUsersHandler = usersHandler();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const navigate = useNavigate();

  const getRecipes = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      const userData = await useUsersHandler.getUserData();
      const cookaiUserId = userData.cookai_user_id;
      if (!cookaiUserId) {
        throw new Error("CookAI user ID not found");
      }
      const response = await useApiHandler.getSavedRecipes(cookaiUserId);
      setRecipes(response || []);
      setFilteredRecipes(response || []); // Atualiza os recipes filtrados também
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  // Atualiza a lista sempre que a página for aberta
  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line
  }, []);

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setShowLoginModal(false);
  };

  const handleExportPDF = async () => {
    if (filteredRecipes.length === 0) {
      alert("Não há receitas para exportar");
      return;
    }

    try {
      await exportRecipesToPDF(filteredRecipes);
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      alert("Erro ao exportar PDF");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <div
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ed4f27ff",
          margin: "10px 0 0 16px",
        }}
      >
        <Book /> Recipes Book
        <SearchBar
          searchTerm={searchTerm}
          recipes={recipes}
          onFilteredRecipes={setFilteredRecipes} // Adiciona o callback para atualizar recipes filtrados
        />
      </div>
      <div
        style={{
          margin: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={styles.title}>Receitas Salvas</div>

        <button
          onClick={handleExportPDF}
          style={{
            backgroundColor: "#ed4f27ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: "bold",
          }}
        >
          <FilePdf size={20} />
          Exportar PDF
        </button>
      </div>
      <RecipesList recipes={filteredRecipes} /> {/* Usa filteredRecipes aqui */}
      <ModalLogin
        visible={showLoginModal}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
    </div>
  );
}

const styles = {
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
};
