import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { __getUserInfo } from "../../apis/userApi";
import { Colors } from "../../styles/colors";

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const loggedinUserId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(__getUserInfo(loggedinUserId)).then((res) => {
      const { type, payload } = res;
      if (type === "getUserInfo/fulfilled") {
        setUser(payload.user);
      }
    });
  }, []);
  return user !== null ? (
    <ProfileSideBarWrapper>
      <Profile>
        <Link to={`/mypage/${loggedinUserId}`}>
          <img src={`${user.profileImg}`} alt="프로필" />
        </Link>
        <div>
          <Nickname>{user.nickname}</Nickname>
          <Email>{user.email}</Email>
        </div>
      </Profile>
    </ProfileSideBarWrapper>
  ) : (
    ""
  );
};

const ProfileSideBarWrapper = styled.div`
  padding: 80px 100px 0 30px;
  min-width: 300px;
`;

const Profile = styled.div`
  display: flex;
  border-radius: 50px;
  margin-right: 15px;
  line-height: 1.6;
  img {
    width: 56px;
    height: 56px;
    border-radius: 50px;
    vertical-align: middle;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const Nickname = styled.p`
  color: ${Colors.black};
  font-weight: bold;
  font-size: 16px;
`;

const Email = styled.p`
  color: ${Colors.skyblue};
  font-size: 12px;
`;
export default ProfileSideBar;
