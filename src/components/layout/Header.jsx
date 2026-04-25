import React, { useState } from "react";
import ProfileDrawer from "../ProfileDrawer";
import { Person } from "react-bootstrap-icons";
import styles from "./Header.module.css";

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);

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
      </div>
      <ProfileDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
}
