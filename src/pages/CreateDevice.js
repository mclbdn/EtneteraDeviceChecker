import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import styles from "./CreateDevice.module.scss";

const CreateDevice = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [os, setOs] = useState("");
  const [osVersion, setOsVersion] = useState("");
  const [vendor, setVendor] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [formHasErrors, setFormHasErrors] = useState(false);

  const createDevice = async (e) => {
    e.preventDefault();

    const response = await fetch("https://js-test-api.etnetera.cz/api/v1/phones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        code,
        os,
        vendor,
        model,
        osVersion,
        image,
      }),
    });

    if (response.status === 201) {
      console.log("OK");
      navigate("/devicelist");
    } else {
      console.log(401);
      setFormHasErrors({
        message: "Error. Telefon nebyl přidán.",
      });
    }
  };

  const verifyUserOrAdmin = async () => {
    const userId = localStorage.getItem("userId");
    const response = await fetch(`https://js-test-api.etnetera.cz/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log(data);

    if (data.type !== "admin") {
      navigate("/devicelist");
    }
  };
  useEffect(() => {
    verifyUserOrAdmin();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <h1 style={{ color: "white" }}>Create Device</h1>
        <form className={styles.form} onSubmit={createDevice}>
          {/* <div className={styles.login_and_password}> */}
          <div className={styles.label_and_input_container}>
            <label htmlFor="code">Kódové označení (identifikátor)</label>
            <input
              type="text"
              name="code"
              id="code"
              placeholder="Kódové označení (identifikátor)"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="vendor">Výrobce</label>
            <input type="text" name="vendor" id="vendor" placeholder="Výrobce" value={vendor} onChange={(e) => setVendor(e.target.value)} required />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="vendor">Model</label>
            <input type="text" name="model" id="model" placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} required />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="os">Operační systém</label>
            <input type="text" name="os" id="os" placeholder="Operační systém" value={os} onChange={(e) => setOs(e.target.value)} required />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="osVersion">Verze operačního systému</label>
            <input
              type="text"
              name="osVersion"
              id="osVersion"
              placeholder="Verze operačního systému"
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
            />
          </div>
          <div className={styles.label_and_input_container}>
            <label htmlFor="osVersion">Obrázek (URL)</label>
            <input type="url" name="image" id="image" placeholder="Obrázek (URL)" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          {/* </div> */}
          <button>Přidat Zařízení</button>
        </form>
      </main>
    </>
  );
};

export default CreateDevice;
