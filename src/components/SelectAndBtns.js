import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearch, setIsAvailableCheckboxChecked, setPhones, setFilteredPhones, setIsResetBtnVisble } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowsRotate, faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./SelectAndBtns.module.scss";

const SelectAndBtns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = useSelector((state) => state.search);
  const available = useSelector((state) => state.available);
  const phones = useSelector((state) => state.phones);
  const osList = useSelector((state) => state.osList);
  const vendorList = useSelector((state) => state.vendorList);
  const isResetBtnVisible = useSelector((state) => state.isResetBtnVisible);
  const isAdmin = useSelector((state) => state.isAdmin);

  useEffect(() => {
    const filteredPhones = phones.filter((phone) => {
      if (!search) {
        return true;
      }

      if (phone.os && phone.os.toLowerCase().startsWith(search)) {
        return true;
      }

      if (phone.osVersion && String(phone.osVersion).toLowerCase().startsWith(search)) {
        return true;
      }

      if (phone.vendor && phone.vendor.toLowerCase().startsWith(search)) {
        return true;
      }

      if (phone.model && phone.model.toLowerCase().startsWith(search)) {
        return true;
      }

      return false;
    });

    dispatch(setFilteredPhones(filteredPhones));
  }, [search]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

  const redirectToCreateDevice = () => {
    navigate("/createdevice");
  };

  const handleOsFilter = (e) => {
    let currentOs = e.target.value;

    const updatePhonesState = phones.filter((phone) => phone.os === currentOs);

    dispatch(setFilteredPhones(updatePhonesState));
    dispatch(setIsResetBtnVisble(true));
  };

  const handleVendorFilter = (e) => {
    let currentVendor = e.target.value;

    const updatePhonesState = phones.filter((phone) => phone.vendor === currentVendor);

    dispatch(setFilteredPhones(updatePhonesState));
    dispatch(setIsResetBtnVisble(true));
  };

  const handleSearch = (e) => {
    const lowerCasedSearch = e.target.value.toLowerCase();
    dispatch(setSearch(lowerCasedSearch));
  };

  const handleAvailable = (e) => {
    dispatch(setIsAvailableCheckboxChecked(e.target.checked));
  };

  // If the state of 
  useEffect(() => {
    const filteredPhones = phones.filter((phone) => {
      if (!("borrowed" in phone) && available) {
        return true;
      }
      return false;
    });

    if (available) {
      dispatch(setFilteredPhones(filteredPhones));
    } else {
      dispatch(setFilteredPhones(phones));
    }
  }, [available]);

  return (
    <div className={styles.select_and_btns_container}>
      <div className={styles.select_container}>
        <select onChange={handleOsFilter} className={styles.select}>
          <option selected disabled>
            OS
          </option>
          {osList.map((os) => {
            return (
              <option key={os} value={os}>
                {os}
              </option>
            );
          })}
        </select>
        <select id="vendor" onChange={handleVendorFilter} className={styles.select}>
          <option selected disabled>
            Výrobce
          </option>
          {vendorList.map((vendor) => {
            return (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            );
          })}
        </select>
        <label className={styles.label_for_screenreader} htmlFor="search">
          Hledat
        </label>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Hledat"
          value={search}
          onChange={(e) => handleSearch(e)}
          className={styles.search_input}
        />
        <div className={styles.available_div}>
          <input type="checkbox" name="available" id="available" onChange={(e) => handleAvailable(e)} className={styles.search_checkbox} />
          <label htmlFor="available">Jen dostupné</label>
        </div>
        {isResetBtnVisible && <FontAwesomeIcon className={styles.reset_btn} onClick={getPhones} icon={faArrowsRotate} />}
      </div>
      <div className={styles.add_and_logout_container}>
        {isAdmin && <FontAwesomeIcon icon={faPlus} onClick={redirectToCreateDevice} className={`${styles.fa_nav_icon} ${styles.plus_fa_nav_icon}`} />}
        <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} className={styles.fa_nav_icon} />
      </div>
    </div>
  );
};

export default SelectAndBtns;
