import React from "react";
import { Routes, Route } from "react-router-dom";
import Analytics from "../Analytics";
import Bmi from "../BMI/Bmi";
import DietHome from "../Favourites/DietHome";
import Home from "../Home";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/favourites" element={<DietHome />}></Route>
      <Route path="/piechart" element={<Analytics />}></Route>
      <Route path="/bmi" element={<Bmi />}></Route>
    </Routes>
  );
};

export default Router;
