import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateDevice = () => {
  const navigate = useNavigate();

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
      <h1 style={{ color: "white" }}>Create Device</h1>
    </>
  );
};

export default CreateDevice;
