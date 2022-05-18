import React from "react";
import Nav from "../components/Nav";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <>
      <Nav />
      <main>
        <h1 className={styles.h1}>Přihlášení</h1>
        <form>
          <div className={styles.label_and_input_container}>
            <label htmlFor="prihlasovaciJmeno">Přihlašovací jméno</label>
            <input type="text" name="prihlasovaciJmeno" id="prihlasovaciJmeno" placeholder="Přihlašovací jméno" />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="heslo">Heslo</label>
            <input type="password" name="heslo" id="heslo" placeholder="Heslo" />
          </div>
          <button>Přihlásit se</button>
        </form>
      </main>
    </>
  );
};

export default Login;
