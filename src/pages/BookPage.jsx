import React, { useState, useEffect } from "react";
import RecipesList from "../components/RecipesList";
import { apiHandler } from "../handlers/apiHandler";
import { useAuth } from "../contexts/auth/useAuth";
import ModalLogin from "../components/ModalLogin";
import { useNavigate } from "react-router-dom";
import { Book, FilePdf } from "react-bootstrap-icons";
import SearchBar from "../components/Searchbar";
import { exportRecipesToPDF } from "../handlers/pdfHandler";
import { indexedDbHandler } from "../handlers/indexedDbHandler";
import RecipeEditor from "../components/RecipeEditor";
import Recipe from "../components/Recipe";

export default function BookPage() {
  const useApiHandler = apiHandler();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState({ step: "", current: 0, total: 0 });
  const [showEditor, setShowEditor] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const getRecipes = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (navigator.onLine) {
      try {
        const response = await useApiHandler.getSavedRecipes();
        setRecipes(response || []);
        setFilteredRecipes(response || []);
        // Salva todas as receitas no IndexedDB para uso offline
        try {
          await indexedDbHandler.clearRecipes();
          if (Array.isArray(response)) {
            for (const recipe of response) {
              await indexedDbHandler.addRecipe(recipe);
            }
          }
        } catch (e) {
          console.error("Erro ao salvar receitas no IndexedDB", e);
        }
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    } else {
      // OFFLINE: buscar do IndexedDB
      try {
        const offlineRecipes = await indexedDbHandler.getAllRecipes();
        setRecipes(offlineRecipes || []);
        setFilteredRecipes(offlineRecipes || []);
      } catch (e) {
        setRecipes([]);
        setFilteredRecipes([]);
      }
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
    setExporting(true);
    setProgress({ step: "summary", current: 0, total: filteredRecipes.length });

    try {
      await exportRecipesToPDF(filteredRecipes, (p) => setProgress(p));
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      alert("Erro ao exportar PDF");
    } finally {
      // pequena espera para UX antes de ocultar
      setTimeout(() => setExporting(false), 500);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const handleEditRecipe = () => {
    setShowRecipeModal(false);
    setEditingRecipe(selectedRecipe);
    setShowEditor(true);
  };

  const handleDeleteRecipe = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta receita?")) {
      return;
    }

    try {
      if (navigator.onLine) {
        await useApiHandler.deleteRecipe(selectedRecipe.id);
      }

      // Remove do IndexedDB
      await indexedDbHandler.removeRecipe(selectedRecipe.id);

      // Atualiza a lista local
      const updatedRecipes = recipes.filter((r) => r.id !== selectedRecipe.id);
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
      setShowRecipeModal(false);
    } catch (error) {
      console.error("Erro ao excluir receita:", error);
    }
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const updatedRecipe = {
        ...editingRecipe,
        title: updatedData.title,
        content: updatedData.content,
      };

      if (navigator.onLine) {
        await useApiHandler.updateRecipe(editingRecipe.id, {
          title: updatedData.title,
          content: updatedData.content,
        });
      }

      // Atualiza no IndexedDB
      await indexedDbHandler.updateRecipe(updatedRecipe);

      // Atualiza a lista local
      const updatedRecipes = recipes.map((r) =>
        r.id === editingRecipe.id ? updatedRecipe : r,
      );
      setRecipes(updatedRecipes);
      setFilteredRecipes(updatedRecipes);
      setShowEditor(false);
      setEditingRecipe(null);
    } catch (error) {
      console.error("Erro ao salvar receita:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        position: "relative",
      }}
    >
      {/* Indicador de geração */}
      {exporting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.25)",
            zIndex: 4000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              minWidth: 280,
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#ed4f27ff",
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              Gerando PDF...
            </div>
            <div style={{ color: "#555", marginBottom: 12 }}>
              {progress.step === "summary"
                ? "Criando sumário"
                : `Processando receita ${progress.current} de ${progress.total}`}
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                background: "#eee",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  width: `${
                    progress.total
                      ? Math.min(
                          100,
                          Math.round((progress.current / progress.total) * 100),
                        )
                      : 10
                  }%`,
                  height: 8,
                  background: "#ed4f27ff",
                  borderRadius: 8,
                  transition: "width 200ms ease",
                }}
              />
            </div>
          </div>
        </div>
      )}

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
          onFilteredRecipes={setFilteredRecipes}
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
          disabled={exporting}
          style={{
            backgroundColor: exporting ? "#f1a48b" : "#ed4f27ff",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 16px",
            cursor: exporting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: "bold",
            opacity: exporting ? 0.8 : 1,
          }}
        >
          <FilePdf size={20} />
          {exporting ? "Gerando..." : "Exportar PDF"}
        </button>
      </div>
      <RecipesList
        recipes={filteredRecipes}
        onRecipeClick={handleRecipeClick}
      />
      <ModalLogin
        visible={showLoginModal}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
      <RecipeEditor
        visible={showEditor}
        onClose={() => {
          setShowEditor(false);
          setEditingRecipe(null);
        }}
        recipe={editingRecipe}
        onSave={handleSaveEdit}
      />
      <Recipe
        visible={showRecipeModal}
        onClose={() => {
          setShowRecipeModal(false);
          setSelectedRecipe(null);
        }}
        data={selectedRecipe?.content || ""}
        showEditButtons={true}
        onEdit={handleEditRecipe}
        onDelete={handleDeleteRecipe}
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
