import React from "react";
import styled from "styled-components";
import { Colors } from "../../styles/colors";
import {
  MdHomeFilled,
  MdAddCircleOutline,
  MdAccountCircle,
} from "react-icons/md";
import { Link } from "react-router-dom";
import useSetUser from "../../hooks/useSetUser";

const Header = () => {
  const user = useSetUser(); // 사용자 정보 조회

  return (
    <HeaderWrapper>
      <h1>Instar⭐gram</h1>
      <MenuList>
        <li>
          <Link to="/">
            <MdHomeFilled />홈
          </Link>
        </li>
        <li>
          <Link>
            <MdAddCircleOutline />
            만들기
          </Link>
        </li>
        <li>
          <Link to={`/mypage/${user?.userId}`}>
            <MdAccountCircle />
            프로필
          </Link>
        </li>
      </MenuList>
      <Logout>
        <span>로그아웃</span>
      </Logout>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 336px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  overflow-y: visible;
  box-sizing: border-box;
  border-bottom-right-radius: 0;
  align-items: stretch;
  overflow-x: visible;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-right: 1px solid ${Colors.grey};
  padding: 45px 20px 12px 28px;
  color: rgb(38, 38, 38);
  h1 {
    font-size: 25px;
    margin-bottom: 60px;
  }

  li {
    font-size: 16px;
    a {
      display: inline-block;
      width: 100%;
      height: 48px;
      line-height: 48px;
      padding-left: 10px;

      svg {
        margin-right: 15px;
        vertical-align: middle;
      }
    }
    &:hover {
      background-color: #fafafa;
      border-radius: 50px;
    }
  }
`;

const Logout = styled.div`
  position: fixed;
  bottom: 20px;
  left: 30px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  &:hover {
    color: tomato;
  }
`;

const MenuList = styled.ul``;
export default Header;
