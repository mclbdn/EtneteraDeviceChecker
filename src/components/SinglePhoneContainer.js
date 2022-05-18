import React from "react";
import no_image_placeholder from "../assets/no_image_placeholder.png";
import styles from "./SinglePhoneContainer.module.scss";

const SinglePhoneContainer = ({ id, model, vendor, os, osVersion, image }) => {
  if (!image) {
    image = no_image_placeholder;
  }
  return (
    <div className={styles.single_phone_container}>
      <img className={styles.image} src={image} alt={model} />
      <p className={styles.model}>{model}</p>
      <p className={styles.vendor}>{vendor}</p>
      <p className={styles.osAndOsVersion}>
        {os}/{osVersion}
      </p>
      <button className={styles.pujcit_btn}>Půjčit</button>
    </div>
  );
};

export default SinglePhoneContainer;
