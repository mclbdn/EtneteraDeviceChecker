import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DeviceList from "./pages/DeviceList";
import CreateDevice from "./pages/CreateDevice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="devicelist" element={<DeviceList />} />
          <Route path="createdevice" element={<CreateDevice />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
