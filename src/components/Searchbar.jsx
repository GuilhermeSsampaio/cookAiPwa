import { useState } from "react";
import { Search, XCircle } from "react-bootstrap-icons";

export default function SearchBar({ searchTerm, recipes, onFilteredRecipes }) {
  const [inputText, setInputText] = useState(searchTerm || "");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    filterRecipes(value);
  };

  const filterRecipes = (query) => {
    if (!query.trim()) {
      onFilteredRecipes(recipes); // Mostra todas as receitas
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      // Busca no título
      const titleMatch = recipe.title?.toLowerCase().includes(lowerQuery);

      // Busca no conteúdo/descrição
      const contentMatch = recipe.content?.toLowerCase().includes(lowerQuery);

      return titleMatch || contentMatch;
    });

    onFilteredRecipes(filtered);
  };

  const handleClear = () => {
    setInputText("");
    onFilteredRecipes(recipes);
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Pesquise suas receitas..."
        value={inputText}
        onChange={handleInputChange}
      />

      {inputText && (
        <button onClick={handleClear} style={styles.iconButton}>
          <XCircle size={20} color="#888" />
        </button>
      )}

      <button style={styles.iconButton}>
        <Search size={28} color="#ef9744ff" />
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6d9d9ff",
    borderRadius: 24,
    padding: "0 16px",
    margin: 16,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
    border: "none",
    outline: "none",
    background: "transparent",
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};
