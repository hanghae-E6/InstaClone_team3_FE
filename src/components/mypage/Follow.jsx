import React from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";

const Follow = ({ user }) => {
  const goToUserMypage = () => {
    window.location.href = `/mypage/${user?.userId}`;
  };
  return (
    <ProfileSideBarWrapper>
      <Profile onClick={goToUserMypage}>
        <img src={`${user?.profileImg}`} alt="프로필" />
        <div>
          <Nickname>{user?.nickname}</Nickname>
        </div>
      </Profile>
    </ProfileSideBarWrapper>
  );
};

const ProfileSideBarWrapper = styled.div`
  padding: 10px;
`;

const Profile = styled.div`
  display: flex;
  border-radius: 50px;
  margin-right: 15px;
  line-height: 2.3;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50px;
    vertical-align: middle;
    margin-right: 20px;
  }
`;

const Nickname = styled.p`
  color: ${Colors.black};
  font-weight: bold;
  font-size: 16px;
`;

export default Follow;
