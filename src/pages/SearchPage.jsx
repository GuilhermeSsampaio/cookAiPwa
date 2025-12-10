import React, { useState } from "react";
import { apiHandler } from "../handlers/apiHandler";
import Recipe from "../components/Recipe";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useSaveRecipe } from "../hooks/useSaveRecipes";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const useApiHandler = apiHandler();
  const { saveRecipe, showLoginModal, handleLogin, handleCancel } =
    useSaveRecipe();

  const handleSearch = async () => {
    if (!query) {
      toast.warn("Por favor, insira uma especificação para buscar receitas.");
      return;
    }

    setLoading(true);
    try {
      const response = await useApiHandler.searchRecipes(query);
      // Limpa a resposta para garantir que seja um JSON válido
      const cleanedResponse = response.recipes
        .replace(/```json|```/g, "")
        .trim();
      const recipes = JSON.parse(cleanedResponse);
      setResults(recipes);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      toast.error(
        "Não foi possível buscar receitas. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Buscar Receitas</div>
      <input
        style={styles.input}
        placeholder="Ex.: Bolo de chocolate sem glúten"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button style={styles.button} onClick={handleSearch} disabled={loading}>
        <span style={styles.buttonText}>
          {loading ? "Buscando..." : "Buscar"}
        </span>
      </button>

      {loading && (
        <div style={{ textAlign: "center", margin: "32px 0" }}>
          <span
            style={{
              fontSize: 24,
              color: "#ed4f27ff",
              fontWeight: "bold",
            }}
          >
            <Spinner />
          </span>
        </div>
      )}

      {!loading && results.length === 0 && (
        <div style={styles.emptyText}>Nenhuma receita encontrada.</div>
      )}

      <div style={{ marginTop: 8 }}>
        {results.map((item, index) => (
          <div
            key={index}
            style={styles.recipeCard}
            // onClick para expandir receita
            onClick={() =>
              setSelectedRecipe(
                `# ${item.title}\n\n**Fonte:** ${item.font}\n**Link:** [${item.link}](${item.link})\n\n${item.description}`
              )
            }
          >
            <div style={styles.recipeTitle}>{item.title}</div>
            <div style={styles.recipeFont}>
              {item.font}
              {item.link && (
                <>
                  {" - "}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.recipeLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver receita original 🔗
                  </a>
                </>
              )}
            </div>
            <div style={styles.recipeDescription}>
              {item.description.substring(0, 150)}...
            </div>

            <button
              style={{
                marginTop: 8,
                background: "#ed4f27ff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={(e) => {
                e.stopPropagation(); // para não abrir o modal ao salvar
                saveRecipe(
                  `# ${item.title}\n\n**Fonte:** ${item.font}\n**Link:** [${item.link}](${item.link})\n\n${item.description}`
                );
              }}
            >
              Salvar
            </button>
          </div>
        ))}
      </div>

      {/* Modal de login, igual ao ScrapResults */}
      {showLoginModal && (
        <div
          style={{
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
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 32,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#ed4f27ff",
                marginBottom: 24,
              }}
            >
              Faça login para salvar receitas
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 16,
              }}
            >
              <button
                style={{
                  backgroundColor: "#ed4f27ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 15,
                }}
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                style={{
                  backgroundColor: "#ed4f27ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: 15,
                }}
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedRecipe && (
        <Recipe
          showSaveButton={true}
          visible={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          data={selectedRecipe}
          handleSave={saveRecipe}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    minHeight: "60vh",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 16,
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#f6a26133",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: "0 12px",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    backgroundColor: "#ed4f27ff",
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: 16,
    transition: "background 0.2s",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0 2px 6px rgba(237,79,39,0.12)",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  recipeFont: {
    fontSize: 14,
    color: "#ed4f27ff",
    fontWeight: "600",
    marginBottom: 8,
  },
  recipeLink: {
    color: "#ed4f27ff",
    textDecoration: "none",
    fontSize: 16,
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    lineHeight: "1.4",
  },
};
