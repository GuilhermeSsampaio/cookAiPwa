import { useState } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import { usersHandler } from "../handlers/usersHandler";
import { setItem, removeItem } from "../handlers/localStorageHandler";
import { useNavigate } from "react-router-dom";

export function useSaveRecipe() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user } = useAuth();
  const useApiHandler = apiHandler();
  const useUsersHandler = usersHandler();
  const navigate = useNavigate();

  const saveRecipe = async (data, onSuccess) => {
    if (!user) {
      setItem("TempRecipe", JSON.stringify(data));
      setShowLoginModal(true);
      return;
    }
    try {
      const userData = await useUsersHandler.getUserData();
      const userId = userData.id;
      await useApiHandler.saveRecipe(userId, { content: data });
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
