import React, { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";
import { Person } from "react-bootstrap-icons";
import styles from "./Header.module.css";

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour >= 5 && hour < 12) return "Bom dia";
  //   if (hour >= 12 && hour < 18) return "Boa tarde";
  //   return "Boa noite";
  // };

  return (
    <>
      <div className={styles.header}>
        <button
          className={styles.profileBtn}
          onClick={() => setDrawerVisible(true)}
        >
          <Person size={24} className={styles.profileIcon} />
        </button>
        <h1 className={styles.title}>CookAi</h1>
        {/* <p className={styles.greeting}>{getGreeting()}!</p>
        <p className={styles.text}>Salve suas receitas e se livre de anúncios!</p> */}
      </div>
      <ProfileDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
}
