import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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
        navigate("/");
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
};
