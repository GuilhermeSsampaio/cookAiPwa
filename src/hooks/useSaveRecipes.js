import { useState } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import { setItem, removeItem } from "../handlers/localStorageHandler";
import { useNavigate } from "react-router-dom";

export function useSaveRecipe() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const useApiHandler = apiHandler();
  const navigate = useNavigate();

  /**
   * Salva uma receita. Espera receber um objeto com {title, content, font, link}
   * compatível com o RecipeRegister do backend.
   */
  const saveRecipe = async (recipeData, onSuccess) => {
    if (!user) {
      setItem("TempRecipe", recipeData);
      setShowLoginModal(true);
      return;
    }
    try {
      await useApiHandler.saveRecipe(recipeData);
      removeItem("TempRecipe");
      if (onSuccess) onSuccess();
    } catch (e) {
      console.error("Failed to save recipe", e);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleCancel = () => {
    removeItem("TempRecipe");
    setShowLoginModal(false);
  };

  return {
    saveRecipe,
    showLoginModal,
    setShowLoginModal,
    handleLogin,
    handleCancel,
  };
}
