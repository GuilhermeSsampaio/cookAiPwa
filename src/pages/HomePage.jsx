import React, { useState } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import ScrapBar from "../components/ScrapBar";
import ScrapResults from "../components/ScrapResults";

export default function Home() {
  const { user } = useAuth();
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const useApiHandler = apiHandler();

  const handleScrap = async (link) => {
    console.log(link);
    setLoading(true);
    setError(null);
    try {
      const response = await useApiHandler.scrapRecipe(link);
      if (response) {
        setResults(response);
      } else {
        setResults("Nenhum resultado encontrado.");
      }
    } catch (error) {
      setError("Erro: " + error);
      setResults("");

      throw new Error("Ocorreu um erro ao tentar extrair a receita");
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Bem-vindo{user ? `, ${user.username}` : ""}!</h1>
      <ScrapBar onScrap={handleScrap} />
      {loading ? (
        <h1>Carregando...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <ScrapResults data={results || ""} />
      )}
      {/* <button onClick={signOut}>Sair</button> */}
    </div>
  );
}
