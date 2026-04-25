import React, { useState } from "react";
import { Lightbulb } from "react-bootstrap-icons";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import ScrapBar from "../components/ScrapBar";
import ScrapResults from "../components/ScrapResults";
import Spinner from "../components/Spinner";
import SuggestionModal from "../components/SuggestionModal";
import { getGreeting, getRandomRecipe } from "./recipeUtils";
import styles from "./HomePage.module.css";

export default function Home() {
  const { user } = useAuth();
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const useApiHandler = apiHandler();

  const handleScrap = async (link) => {
    setLoading(true);
    setError(null);
    try {
      const response = await useApiHandler.scrapRecipe(link);
      setResults(response || "Nenhum resultado encontrado.");
    } catch (error) {
      setError("Erro: " + error);
      setResults("");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSuggestion = () => {
    setCurrentRecipe(getRandomRecipe());
    setModalVisible(true);
  };

  const handleNextRecipe = () => {
    setCurrentRecipe(getRandomRecipe());
  };

  const handleSaveRecipe = () => {
    console.log("Receita salva:", currentRecipe);
    setModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.greeting}>
          {getGreeting()}
          {user && <span className={styles.username}>, {user.username}</span>}!
        </h1>
      </div>

      <button className={styles.suggestionBtn} onClick={handleOpenSuggestion}>
        <Lightbulb size={16} />
        Quer uma sugestão?
      </button>

      <SuggestionModal
        visible={modalVisible}
        recipe={currentRecipe}
        onClose={() => setModalVisible(false)}
        onNext={handleNextRecipe}
        onSave={handleSaveRecipe}
      />

      <div className={styles.content}>
        <ScrapBar onScrap={handleScrap} />
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spinner />
          </div>
        ) : error ? (
          <div className={styles.errorAlert}>{error}</div>
        ) : (
          <ScrapResults data={results || ""} />
        )}
      </div>
    </div>
  );
}
