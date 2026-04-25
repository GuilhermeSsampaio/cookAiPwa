import React from "react";
import { Heart, ChevronRight, X } from "react-bootstrap-icons";
import styles from "./SuggestionModal.module.css";

export default function SuggestionModal({ visible, recipe, onClose, onNext, onSave }) {
  if (!visible) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <img src={recipe.image} alt={recipe.name} className={styles.image} />

        <div className={styles.content}>
          <h2 className={styles.recipeName}>{recipe.name}</h2>
          <p className={styles.mealType}>{recipe.mealType}</p>

          <div className={styles.info}>
            <span className={styles.infoItem}>⏱️ {recipe.prepTime} min</span>
            <span className={styles.infoItem}>👥 {recipe.servings} porções</span>
          </div>

          <div className={styles.description}>
            <p>{recipe.description}</p>
          </div>

          <div className={styles.actions}>
            <button className={styles.secondaryBtn} onClick={onNext}>
              <ChevronRight size={18} />
              Outra sugestão
            </button>
            <button className={styles.primaryBtn} onClick={onSave}>
              <Heart size={18} />
              Salvar receita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
