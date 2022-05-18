import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const DeviceList = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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

    if (response.status !== 200) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   navigate("/login");
    // }
    verifyUserOrAdmin();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <ul>
          <button onClick={logout}>Odhlásit</button>
        </ul>
        <h1 style={{ color: "white" }}>Device List</h1>
      </main>
    </>
  );
};

export default DeviceList;
