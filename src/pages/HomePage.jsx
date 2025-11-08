import React, { useState } from "react";
import { useAuth } from "../contexts/auth/useAuth";
import { apiHandler } from "../handlers/apiHandler";
import ScrapBar from "../components/ScrapBar";
import ScrapResults from "../components/ScrapResults";
import Spinner from "../components/Spinner";

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
      <div style={styles.title} className="m-4">
        Bem-vindo{user ? `, ${user.username}` : ""}!
      </div>

      <ScrapBar onScrap={handleScrap} />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <Spinner />
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
const styles = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 16,
    textAlign: "left",
  },
};
