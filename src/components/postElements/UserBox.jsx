import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import ProfileImg from "../../assets/ProfileImg.png";
import useSetUser from "../../hooks/useSetUser";

function UserBox({ userInfo }) {
  const user = useSetUser(userInfo?.userId); // 사용자 정보 조회

  return user ? (
    <Info>
      <User>
        <Link to={`/mypage/${user?.userId}`}>
          <ProfilePic>
            <img
              src={user.profileImg}
              style={{ width: "40px", margin: "0px 5px" }}
              alt=""
            />
          </ProfilePic>
        </Link>
        <UserName>{user?.nickname}</UserName>
      </User>
    </Info>
  ) : (
    ""
  );
}

const Info = styled.div`
  height: 50px;
  padding-left: 10px;
  padding-top: 5px;
  display: flex;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.div`
  padding: 0;
  background: none;
  img {
    height: 40px;
    border-radius: 50px;
  }
`;

const UserName = styled.p`
  width: auto;
  font-weight: bold;
  color: #000;
  font-size: 14px;
  margin-left: 10px;
`;

export default UserBox;
