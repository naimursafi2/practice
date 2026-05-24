import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
