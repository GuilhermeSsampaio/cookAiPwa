import React, { useState } from "react";
import { Search, ForkKnife, JournalBookmarkFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

const tabs = [
  {
    name: "CookAi",
    path: "/",
    icon: ForkKnife,
  },
  {
    name: "Book",
    path: "/book",
    icon: JournalBookmarkFill,
  },
  {
    name: "Search",
    path: "/search",
    icon: Search,
  },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className={styles.footer}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            className={`${styles.tabButton} ${
              activeTab === tab.path ? styles.tabButtonActive : ""
            }`}
            onClick={() => handleTabClick(tab.path)}
          >
            <Icon className={styles.icon} />
            <span className={styles.label}>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
}
