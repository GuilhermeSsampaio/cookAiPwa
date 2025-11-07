import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    name: "CookAi",
    path: "/",
    icon: "👨‍🍳", // chef hat emoji
  },
  {
    name: "Book",
    path: "/book",
    icon: "📖", // book emoji
  },
  {
    name: "Search",
    path: "/search",
    icon: "🔍", // search emoji
  },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    console.log(path);
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div style={styles.footer}>
      {tabs.map((tab) => (
        <button
          key={tab.path}
          style={{
            ...styles.tabButton,
            ...(activeTab === tab.path ? styles.tabButtonActive : {}),
          }}
          onClick={() => handleTabClick(tab.path)}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}

const styles = {
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100vw",
    background: "#fff",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 0",
    zIndex: 100,
    boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
  },
  tabButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#888",
    fontSize: 14,
    transition: "color 0.2s",
  },
  tabButtonActive: {
    color: "#ed4f27ff",
    fontWeight: "bold",
  },
  icon: {
    fontSize: 22,
    marginBottom: 2,
  },
  label: {
    fontSize: 13,
  },
};
