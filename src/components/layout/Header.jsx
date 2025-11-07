import React, { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <div style={styles.header}>
        <button
          style={styles.profileBtn}
          onClick={() => setDrawerVisible(true)}
        >
          {/* Ícone de usuário usando emoji, substitua por SVG se preferir */}
          <span
            role="img"
            aria-label="user"
            style={{ fontSize: 28, color: "#fff" }}
          >
            👤
          </span>
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
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 20,
    padding: 4,
    border: "none",
    cursor: "pointer",
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
