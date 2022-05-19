import React, { useEffect, useState } from "react";
import no_image_placeholder from "../assets/no_image_placeholder.png";
import styles from "./SinglePhoneContainer.module.scss";

const SinglePhoneContainer = ({ id, model, vendor, os, osVersion, image, borrowed }) => {
  const [isPhoneBorrowed, setIsPhoneBorrowed] = useState(borrowed ? true : false);
  // const userIdThatBorrowed = borrowed ? borrowed.user.id : null;
  const [userIdThatBorrowed] = useState(borrowed ? borrowed.user.id : null);
  const [canThisUserReturn, setCanThisUserReturn] = useState(userIdThatBorrowed === localStorage.getItem("userId"));
  const [btnText, setBtnText] = useState(canThisUserReturn ? "Vrátit" : "Půjčit");

  console.log(`This user can vrátit phone: ${canThisUserReturn}`);

  if (!image) {
    image = no_image_placeholder;
  }

  const returnPhone = async () => {
    const response = await fetch(`https://js-test-api.etnetera.cz/api/v1/phones/${id}/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log(data);
    setBtnText("Půjčit");
    setCanThisUserReturn(true);
    setIsPhoneBorrowed(false);
    setCanThisUserReturn(true)
  };

  const borrowPhone = async () => {
    const response = await fetch(`https://js-test-api.etnetera.cz/api/v1/phones/${id}/borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log(data);
    setBtnText("Vrátit");
    setIsPhoneBorrowed(true);
  };

  let btn;

  if (isPhoneBorrowed && canThisUserReturn) {
    btn = (
      <button style={{ backgroundColor: "yellow" }} onClick={returnPhone} className={styles.pujcit_btn}>
        Vrátit
      </button>
    );
  } else if (isPhoneBorrowed && !canThisUserReturn) {
    btn = (
      <button disabled style={{ backgroundColor: "gray", cursor: "not-allowed" }} onClick={returnPhone} className={styles.pujcit_btn}>
        Vrátit
      </button>
    );
  } else {
    btn = (
      <button style={{ backgroundColor: "green" }} onClick={borrowPhone} className={styles.pujcit_btn}>
        Půjčit
      </button>
    );
  }

  return (
    <div className={styles.single_phone_container}>
      <img className={styles.image} src={image} alt={model} />
      <p className={styles.model}>{model}</p>
      <p className={styles.vendor}>{vendor}</p>
      <p className={styles.osAndOsVersion}>
        {os}/{osVersion}
      </p>
      {btn}
    </div>
  );
};

export default SinglePhoneContainer;
