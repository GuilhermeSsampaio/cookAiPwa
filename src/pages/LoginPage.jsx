import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removido Router pois não é necessário
import { useAuth } from "../contexts/auth/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("login", response);
      if (response) navigate("/");
    } catch (err) {
      console.error(err);
      alert("Erro ao logar");
    }
  }

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <input
            placeholder="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={handleRegister}
            style={{ padding: "8px 16px", cursor: "pointer" }}
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
