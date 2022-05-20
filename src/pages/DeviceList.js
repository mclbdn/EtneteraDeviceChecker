import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhones, setFilteredPhones, setOsList, setVendorList, setIsResetBtnVisble, setIsAdmin } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import SinglePhoneContainer from "../components/SinglePhoneContainer";
import styles from "./DeviceList.module.scss";
import SelectAndBtns from "../components/SelectAndBtns";

const DeviceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phones = useSelector((state) => state.phones);
  const filteredPhones = useSelector((state) => state.filteredPhones);
  const isResetBtnVisible = useSelector((state) => state.isResetBtnVisible);

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
      dispatch(setIsAdmin(true));
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

    if (isResetBtnVisible) {
      dispatch(setIsResetBtnVisble(false));
    }

    dispatch(setPhones(data));
    dispatch(setFilteredPhones(data));
  };

  useEffect(() => {
    const osSet = new Set();
    const vendorSet = new Set();

    if (phones) {
      phones.forEach((phone) => {
        osSet.add(phone.os);
        vendorSet.add(phone.vendor);
      });
    }
    dispatch(setOsList([...osSet]));
    dispatch(setVendorList([...vendorSet]));
  }, [phones, dispatch]);

  useEffect(() => {
    verifyUserOrAdmin();
    getPhones();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <SelectAndBtns />
        <h1 style={{ color: "white" }}>Device List</h1>
        <div className={styles.phones_container}>
          {filteredPhones.map((phone) => {
            return (
              <SinglePhoneContainer
                key={phone.id}
                id={phone.id}
                model={phone.model}
                vendor={phone.vendor}
                os={phone.os}
                osVersion={phone.osVersion}
                image={phone.image}
                borrowed={phone.borrowed}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default DeviceList;
