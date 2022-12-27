import React from "react";
import Home from "../components/Home";
import Signin from "../components/signin/Signin";

const Main = () => {
  const loginStatus = localStorage.getItem("refreshToken");

  return !loginStatus ? <Signin /> : <Home />;
};

export default Main;
