import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import DeviceList from "./pages/DeviceList";
import CreateDevice from "./pages/CreateDevice";
import Error404 from "./pages/Error404";
import "./styles/_base.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="devicelist" element={<DeviceList />} />
          <Route path="createdevice" element={<CreateDevice />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
