import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

export default function UserPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div style={styles.container}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
        alt="Avatar"
        style={styles.avatar}
      />
      <div style={styles.name}>{user?.username || "Usuário"}</div>
      <div style={styles.email}>{user?.email || ""}</div>
      <div style={styles.label}>Sobre:</div>
      <div style={styles.about}>
        Apaixonado por culinária e tecnologia. Adora testar novas receitas e
        compartilhar conhecimento!
      </div>
      <button style={styles.logoutButton} onClick={handleLogout}>
        <span style={styles.logoutButtonText}>Sair</span>
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
  avatar: {
    width: 96,
    height: 96,
    borderRadius: "50%",
    marginBottom: 16,
    objectFit: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    alignSelf: "flex-start",
    width: "100%",
  },
  about: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
    textAlign: "left",
    alignSelf: "flex-start",
    width: "100%",
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#ed4f27ff",
    padding: "12px 32px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};
