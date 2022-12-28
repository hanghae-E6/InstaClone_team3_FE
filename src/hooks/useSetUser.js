import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { __getUserInfo } from "../apis/userApi";

const useSetUser = (userId) => {
  const dispatch = useDispatch();
  const id = userId ? userId : localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(__getUserInfo(id)).then((res) => {
      const { type, payload } = res;
      if (type === "getUserInfo/fulfilled") {
        setUser(payload.user);
      }
    });
  }, []);

  return user;
};

export default useSetUser;
