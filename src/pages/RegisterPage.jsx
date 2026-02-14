import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/constants";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.warn("Todos os campos são obrigatórios.");
      return;
    }
    setLoading(true);
    try {
      const response = await registerIn(
        username,
        email,
        password /*, isPremium */,
      );
      if (response) {
        toast.success("Usuário registrado com sucesso!");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao registrar. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar</h2>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <input
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        {/* 
        <div style={styles.switchContainer}>
          <label style={styles.switchLabel}>Conta Premium</label>
          <input
            type="checkbox"
            checked={isPremium}
            onChange={() => setIsPremium(!isPremium)}
          />
        </div>
        */}
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>

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
        Registrar com Google
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
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    width: "100%",
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
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
  },
  buttonDisabled: {
    backgroundColor: "#f6a261ff",
    cursor: "not-allowed",
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
