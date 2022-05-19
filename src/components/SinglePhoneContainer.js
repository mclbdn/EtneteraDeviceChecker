import React, { useEffect, useState } from "react";
import no_image_placeholder from "../assets/no_image_placeholder.png";
import styles from "./SinglePhoneContainer.module.scss";

const SinglePhoneContainer = ({ id, model, vendor, os, osVersion, image, borrowed }) => {
  const [borrowersId, setBorrowersId] = useState(borrowed ? borrowed.user.id : null);
  const [isPhoneBorrowed, setIsPhoneBorrowed] = useState(borrowed ? true : false);
  const [borrowerDetails, setBorrowerDetails] = useState({});
  const [canThisUserReturn, setCanThisUserReturn] = useState(borrowersId === localStorage.getItem("userId"));

  const returnPhone = async () => {
    await fetch(`https://js-test-api.etnetera.cz/api/v1/phones/${id}/return`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    setCanThisUserReturn(false);
    setIsPhoneBorrowed(false);
    setBorrowersId(null);
    setBorrowerDetails({});
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
    console.log(data.borrowed);

    setBorrowerDetails({ userdId: data.borrowed.user.id, userName: data.borrowed.user.name, date: new Date(data.borrowed.date).toLocaleString() });

    setBorrowersId(data.borrowed.user.id);
    setIsPhoneBorrowed(true);
    setCanThisUserReturn(true);
  };

  const getBorrowersData = async () => {
    const response = await fetch(`https://js-test-api.etnetera.cz/api/v1/phones/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    setBorrowerDetails({ userdId: data.borrowed.user.id, userName: data.borrowed.user.name, date: new Date(data.borrowed.date).toLocaleString() });
  };

  useEffect(() => {
    if (borrowed) {
      getBorrowersData();
    }
  }, []);

  if (!image) {
    image = no_image_placeholder;
  }

  let btn;

  if (isPhoneBorrowed && canThisUserReturn) {
    btn = (
      <button onClick={returnPhone} className={`${styles.pujcit_btn} ${styles.vratit_btn}`}>
        Vrátit
      </button>
    );
  } else if (isPhoneBorrowed && !canThisUserReturn) {
    btn = (
      <button disabled onClick={returnPhone} className={`${styles.pujcit_btn} ${styles.disabled_btn}`}>
        Vrátit
      </button>
    );
  } else {
    btn = (
      <button onClick={borrowPhone} className={styles.pujcit_btn}>
        Půjčit
      </button>
    );
  }

  return (
    <div className={styles.single_phone_container}>
      {isPhoneBorrowed && (
        <div className={styles.borrowed_details}>
          <p>{`Vypůjčeno: ${borrowerDetails.userName}, ${borrowerDetails.date}`}</p>
        </div>
      )}
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
