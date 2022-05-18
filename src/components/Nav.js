import React from "react";
import etnetera_logo from "../assets/etnetera_logo.svg";
import styles from "./Nav.module.scss";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo_container}>
        <img className={styles.etnetera_logo} src={etnetera_logo} />
        <p className={styles.logo_text}>Device Checker</p>
      </div>
      
    </nav>
  );
};

export default Nav;
