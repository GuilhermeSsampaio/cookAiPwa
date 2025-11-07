import React, { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";
import { Person } from "react-bootstrap-icons"; // Trocando para o ícone Person que é mais clean

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <div style={styles.header}>
        <button
          style={styles.profileBtn}
          onClick={() => setDrawerVisible(true)}
        >
          <Person size={24} style={styles.profileIcon} />
        </button>
        <h1 style={styles.title}>CookAi</h1>
        <p style={styles.text}>Bem vindo ao CookAi!</p>
        <p style={styles.text}>Salve suas receitas e se livre de anúncios!</p>
        {/* 
        <p style={styles.text}>
          Não perca tempo, copie o link da receita e cole aqui
        </p>
        <p style={styles.text}>E a mágica acontece!</p> */}
      </div>
      <ProfileDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
}

const styles = {
  header: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 16px 22px 16px",
    position: "relative",
    background: "linear-gradient(180deg, #ed4f27ff 0%, #f6a261ff 100%)",
  },
  profileBtn: {
    position: "absolute",
    top: 20,
    right: 24,
    zIndex: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "50%",
    width: 40,
    height: 40,
    border: "2px solid rgba(255,255,255,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    padding: 0,
  },
  profileIcon: {
    color: "#fff",
    transition: "transform 0.2s ease",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
    marginTop: 0,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 0,
  },
};
