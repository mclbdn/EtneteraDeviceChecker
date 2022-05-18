import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";
import SinglePhoneContainer from "../components/SinglePhoneContainer";
import styles from "./DeviceList.module.scss";

const DeviceList = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [phones, setPhones] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const redirectToCreateDevice = () => {
    navigate("/createdevice");
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

    if (data.type === "admin") {
      setIsAdmin(true);
    }

    if (response.status !== 200) {
      navigate("/login");
    }
  };

  const getPhones = async () => {
    const response = await fetch("https://js-test-api.etnetera.cz/api/v1/phones", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log(data);
    setPhones(data);
  };

  useEffect(() => {
    verifyUserOrAdmin();
    getPhones();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <div className={styles.nav_btns_container}>
          {isAdmin && (
            <FontAwesomeIcon icon={faPlus} onClick={redirectToCreateDevice} className={`${styles.fa_nav_icon} ${styles.plus_fa_nav_icon}`} />
          )}
          <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} className={styles.fa_nav_icon} />
        </div>
        <h1 style={{ color: "white" }}>Device List</h1>
        <div className={styles.phones_container}>
          {phones.map((phone) => {
            return <SinglePhoneContainer />;
          })}
        </div>
      </main>
    </>
  );
};

export default DeviceList;
