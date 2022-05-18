import React, { useState } from "react";
import Nav from "../components/Nav";
import styles from "./Login.module.scss";

const Login = () => {
  const [prihlasovaciJmeno, setPrihlasovaciJmeno] = useState("");
  const [heslo, setHeslo] = useState("");
  const [formHasErrors, setFormHasErrors] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("https://js-test-api.etnetera.cz/api/v1/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: prihlasovaciJmeno,
        password: heslo,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log("OK");
    } else if (response.status === 401) {
      console.log(401);
      setFormHasErrors({
        message: "Nesprávné přihlašovací jméno či heslo!",
      });
    } else if (response.status === 400) {
      console.log(400);
      setFormHasErrors({
        message: "Je potřeba vyplnit přihlašovací jméno a heslo!",
      });
    }
  };

  return (
    <>
      <Nav />
      <main>
        <h1 className={styles.h1}>Přihlášení</h1>
        <form onSubmit={login}>
          <div className={styles.label_and_input_container}>
            <label htmlFor="prihlasovaciJmeno">Přihlašovací jméno</label>
            <input
              type="text"
              name="prihlasovaciJmeno"
              id="prihlasovaciJmeno"
              placeholder="Přihlašovací jméno"
              value={prihlasovaciJmeno}
              onChange={(e) => setPrihlasovaciJmeno(e.target.value)}
              required
            />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="heslo">Heslo</label>
            <input type="password" name="heslo" id="heslo" placeholder="Heslo" value={heslo} onChange={(e) => setHeslo(e.target.value)} required />
          </div>
          <button>Přihlásit se</button>
        </form>
      </main>
    </>
  );
};

export default Login;
