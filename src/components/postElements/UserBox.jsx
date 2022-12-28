import React from "react";
import styled from "styled-components";
import ProfileImg from "../../assets/ProfileImg.png";

function UserBox({ userInfo }) {
  return (
    <Info>
      <User>
        <ProfilePic>
          <img
            src={ProfileImg}
            style={{ width: "40px", margin: "0px 5px" }}
            alt=""
          />
        </ProfilePic>
        <UserName>{userInfo?.nickname}</UserName>
      </User>
    </Info>
  );
}

const Info = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.div`
  height: 40px;
  width: 40px;
  padding: 0;
  background: none;
`;

const UserName = styled.p`
  width: auto;
  font-weight: bold;
  color: #000;
  font-size: 14px;
  margin-left: 10px;
`;

export default UserBox;
