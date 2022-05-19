import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faArrowsRotate, faPlus } from "@fortawesome/free-solid-svg-icons";
import SinglePhoneContainer from "../components/SinglePhoneContainer";
import styles from "./DeviceList.module.scss";

const DeviceList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [osList, setOsList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [isAvailableCheckboxChecked, setIsAvailableCheckboxChecked] = useState(false);
  const [isResetBtnVisible, setIsResetBtnVisble] = useState(false);
  const osSet = new Set();
  const vendorSet = new Set();

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

    if (isResetBtnVisible) {
      setIsResetBtnVisble(false);
    }

    setPhones(data);
    setFilteredPhones(data);
    console.log(data);
  };

  const handleOsFilter = (e) => {
    let currentOs = e.target.value;

    const updatePhonesState = phones.filter((phone) => phone.os === currentOs);

    setFilteredPhones(updatePhonesState);
    setIsResetBtnVisble(true);
  };

  const handleVendorFilter = (e) => {
    let currentVendor = e.target.value;

    const updatePhonesState = phones.filter((phone) => phone.vendor === currentVendor);

    setFilteredPhones(updatePhonesState);
    setIsResetBtnVisble(true);
  };

  const handleSearch = (e) => {
    const lowerCasedSearch = e.target.value.toLowerCase();
    setSearch(lowerCasedSearch);
  };

  const handleAvailable = (e) => {
    setIsAvailableCheckboxChecked(e.target.checked);
  };

  useEffect(() => {
    const filteredPhones = phones.filter((phone) => {
      if (!("borrowed" in phone) && isAvailableCheckboxChecked) {
        return true;
      }
      return false;
    });

    if (isAvailableCheckboxChecked) {
      setFilteredPhones(filteredPhones);
    } else {
      setFilteredPhones(phones);
    }
  }, [isAvailableCheckboxChecked]);

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

    setFilteredPhones(filteredPhones);
  }, [search]);

  useEffect(() => {
    if (phones) {
      phones.forEach((phone) => {
        osSet.add(phone.os);
        vendorSet.add(phone.vendor);
      });
    }
    setOsList([...osSet]);
    setVendorList([...vendorSet]);
  }, [phones]);

  useEffect(() => {
    verifyUserOrAdmin();
    getPhones();
  }, []);

  return (
    <>
      <Nav />
      <main>
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
            {isAdmin && (
              <FontAwesomeIcon icon={faPlus} onClick={redirectToCreateDevice} className={`${styles.fa_nav_icon} ${styles.plus_fa_nav_icon}`} />
            )}
            <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={logout} className={styles.fa_nav_icon} />
          </div>
        </div>
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
