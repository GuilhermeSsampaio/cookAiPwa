import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { toast } from "react-toastify";
import { getItem, removeItem } from "../handlers/localStorageHandler";
import { apiHandler } from "../handlers/apiHandler";
import { BASE_URL } from "../constants/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const useApiHandler = apiHandler();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.warn("Todos os campos são obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response) {
        toast.success("Login realizado com sucesso!");
        navigate("/book");

        // Salva receita temporária se existir
        const tempRecipe = getItem("TempRecipe");
        if (tempRecipe != null) {
          try {
            await useApiHandler.saveRecipe(tempRecipe);
            removeItem("TempRecipe");
          } catch (err) {
            console.error("Erro ao salvar receita temporária:", err);
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", display: "flex", flexDirection: "column" }}
      >
        <input
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          style={styles.input}
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <div style={styles.registerLink}>
        <span style={styles.registerText}>
          Não tem uma conta?{" "}
          <span
            style={styles.registerTextBold}
            onClick={() => navigate("/register")}
          >
            Registre-se
          </span>
        </span>
      </div>

      <div style={styles.divider}>
        <div style={styles.dividerLine} />
        <span style={styles.dividerText}>ou</span>
        <div style={styles.dividerLine} />
      </div>

      <button
        type="button"
        style={styles.googleButton}
        onClick={() => {
          window.location.href = `${BASE_URL}/auth/google/`;
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 48 48"
          style={{ marginRight: 10 }}
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0124 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 01-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>
        Entrar com Google
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#f6a26133",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
    padding: "0 12px",
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    backgroundColor: "#ed4f27ff",
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: 8,
    transition: "background 0.2s",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#f6a261ff",
    cursor: "not-allowed",
  },
  registerLink: {
    marginTop: 16,
    textAlign: "center",
    cursor: "pointer",
  },
  registerText: {
    fontSize: 14,
    color: "#656060ff",
  },
  registerTextBold: {
    fontWeight: "bold",
    color: "#ed4f27ff",
    cursor: "pointer",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "16px 0",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    fontSize: 13,
    color: "#999",
  },
  googleButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 0",
    borderRadius: 8,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
};
