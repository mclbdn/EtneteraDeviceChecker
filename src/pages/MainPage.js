import React from "react";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Mainpage.module.scss";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const MainPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.link_and_login_logo}>
        <a className={styles.a} href="/login">
          Přihlásit se
          <span>
            <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.login_logo} />
          </span>
        </a>
      </div>
    </>
  );
};

export default MainPage;
