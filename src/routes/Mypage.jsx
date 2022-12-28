import React from "react";
import { useParams } from "react-router-dom";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import useSetUser from "../hooks/useSetUser";

const Mypage = () => {
  const param = useParams();
  const user = useSetUser(param.userId);
  console.log(user);
  return <ProfileTemplate>Mypage</ProfileTemplate>;
};

export default Mypage;
