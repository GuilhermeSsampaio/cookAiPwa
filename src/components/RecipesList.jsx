import React from "react";

export default function RecipesList({ recipes, onRecipeClick }) {
  return (
    <div style={styles.listContainer}>
      {recipes && recipes.length > 0 ? (
        recipes.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() => onRecipeClick && onRecipeClick(item)}
          >
            <div style={styles.title}>{item.title}</div>
            <div style={styles.date}>
              {item.created_at
                ? new Date(item.created_at).toLocaleDateString()
                : ""}
            </div>
          </div>
        ))
      ) : (
        <div style={styles.empty}>
          <span style={styles.emptyText}>Nenhuma receita salva.</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  listContainer: {
    padding: 16,
    paddingBottom: 32,
    minHeight: "60vh",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    boxShadow: "0 2px 6px rgba(237,79,39,0.12)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#f6a26133",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
  empty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 48,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 16,
  },
};
