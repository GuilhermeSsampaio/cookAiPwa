import React, { useState, useEffect } from "react";
import RecipesList from "../components/RecipesList";
import { apiHandler } from "../handlers/apiHandler";
import { useAuth } from "../contexts/auth/useAuth";
import ModalLogin from "../components/ModalLogin";
import { useNavigate } from "react-router-dom";
import { userApiHandler } from "../handlers/userApiHandler";

export default function BookPage() {
  const useApiHandler = apiHandler();
  const userAPI = userApiHandler();
  const { user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const getRecipes = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      const userData = await userAPI.getUserData();
      const userId = userData.id;
      const response = await useApiHandler.getSavedRecipes(userId);
      setRecipes(response || []);
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
        📖 Recipes Book
      </div>
      <RecipesList recipes={recipes} />
      <ModalLogin
        visible={showLoginModal}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
    </div>
  );
}
