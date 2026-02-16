import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      const errorParam = searchParams.get("error");
      if (errorParam) {
        setError(errorParam);
        toast.error(errorParam);
        setTimeout(() => navigate("/login", { replace: true }), 2000);
        return;
      }

      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      if (!accessToken) {
        setError("Token não encontrado na URL.");
        toast.error("Falha na autenticação com Google.");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
        return;
      }

      try {
        await loginWithToken(accessToken, refreshToken);
        toast.success("Login com Google realizado com sucesso!");
        navigate("/book", { replace: true });
      } catch (err) {
        console.error("Erro ao completar login Google:", err);
        setError("Erro ao completar autenticação.");
        toast.error("Erro ao completar login com Google.");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleCallback();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={styles.container}>
      {error ? (
        <div style={styles.errorText}>{error}</div>
      ) : (
        <>
          <Spinner />
          <div style={styles.text}>Autenticando com Google...</div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27ff",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
    padding: 16,
  },
};
