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
    <div className="container">
      <h1 className="display-6 fw-bold text-center py-3 mb-4 bg-light rounded shadow-sm mt-4">
        Bem-vindo{user ? `, ${user.username}` : ""}!
      </h1>
      <ScrapBar onScrap={handleScrap} />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center mt-4" role="alert">
          {error}
        </div>
      ) : (
        <ScrapResults data={results || ""} />
      )}
      {/* <button onClick={signOut}>Sair</button> */}
    </div>
  );
}
