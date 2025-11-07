import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";
import { toast } from "react-toastify";

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
        password /*, isPremium */
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
};
