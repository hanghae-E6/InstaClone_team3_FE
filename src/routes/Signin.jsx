// view 구현을 위해 만든 임시 페이지입니다.
// 로그인 기능 완료 시 Home에 token 값 유무에 따라 로그인 또는 메인 페이지를 보여주도록 합칠 예정입니다.
import "../components/signin/signin.css";
import React, { useState } from "react";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import SliderContainer from "../components/signin/SliderContainer";
import axios from "../../node_modules/axios/index";
import { __signin } from "../lib/userApi";
import { useDispatch } from "../../node_modules/react-redux/es/exports";
import api from "../lib/api";

const Signin = () => {
  const dispatch = useDispatch;
  const [email, , inputEmail] = useInput("");

  const [password, , inputPassword] = useInput("");

  const [showStatusToggle, setShowStatusToggle] = useState(false);

  const showPassword = {
    type: "password",
    text: "비밀번호 표시",
    textMargin: "210px",
  };

  const hidePassword = {
    type: "text",
    text: "숨기기",
    textMargin: "255px",
  };

  const [passwordShowStatus, setPasswordShowstatus] = useState(showPassword);

  const togglePW = () => {
    setShowStatusToggle((prev) => !prev);
    if (showStatusToggle) {
      setPasswordShowstatus(hidePassword);
    } else {
      setPasswordShowstatus(showPassword);
    }
  };

  const [buttonDisableToggle, setButtonDisableToggle] = useState(true);

  const onBlurEmail = () => {
    if (password && email) {
      api
        .post("/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          const { accesstoken, refreshtoken } = res.headers;
          const { userId } = res.data;
          localStorage.setItem("accessToken", accesstoken);
          localStorage.setItem("refreshToken", refreshtoken);
          localStorage.setItem("userId", userId);
        })
        .catch((e) => console.log(e));
      setButtonDisableToggle(false);
    } else {
      setButtonDisableToggle(true);
    }
  };

  const onBlurPassword = () => {
    if (email && password) {
      api
        .post("/api/user/login", {
          email,
          password,
        })
        .then((res) => {
          const { accesstoken, refreshtoken } = res.headers;
          const { userId } = res.data;
          localStorage.setItem("accessToken", accesstoken);
          localStorage.setItem("refreshToken", refreshtoken);
          localStorage.setItem("userId", userId);
        })
        .catch((e) => console.log(e));
      setButtonDisableToggle(false);
    } else {
      setButtonDisableToggle(true);
    }
  };

  return (
    <WrapAll>
      <Wrap>
        <SliderContainer />
        <WrapContentBox>
          <ContentBox>
            <Logo>Instar⭐gram</Logo>
            <SigninBox>
              <div className="signin-input-box">
                <Input
                  className="signin-input"
                  value={email}
                  onChange={inputEmail}
                  onBlur={onBlurEmail}
                  style={{ margin: "0 40px 10px" }}
                  placeholder="사용자 이름 또는 이메일"
                />
                <label>사용자 이름 또는 이메일</label>
              </div>
              <div className="signin-input-box">
                <Input
                  className="signin-input"
                  type={passwordShowStatus.type}
                  value={password}
                  onChange={inputPassword}
                  onBlur={onBlurPassword}
                  style={{ margin: "0 40px 10px" }}
                  placeholder="비밀번호"
                />
                <label>비밀번호</label>
                {password && (
                  <PasswordShowStatus
                    onClick={togglePW}
                    marginLeft={passwordShowStatus.textMargin}
                  >
                    {passwordShowStatus.text}
                  </PasswordShowStatus>
                )}
              </div>
              <Button
                className="signin-button"
                margin="10px 40px 10px"
                padding="6px 16px"
                fontSize="initial"
                letterSpacing="-1px"
                borderRadius="8px"
                disabled={buttonDisableToggle}
              >
                로그인
              </Button>
            </SigninBox>
          </ContentBox>
          <ContentBox>
            <Login>
              계정이 없으신가요? <LoginLink href="/signup">가입하기</LoginLink>
            </Login>
          </ContentBox>
        </WrapContentBox>
      </Wrap>
    </WrapAll>
  );
};

export default Signin;

const WrapAll = styled.div`
  background-color: rgb(250, 250, 250);
  padding: 58px 0px;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const WrapContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.3%;
  margin-bottom: 5.3%;
  max-width: 350px;
`;

const Logo = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap");
  font-family: "Oleo Script", cursive;
  font-size: 35px;
  margin-top: calc(4px * 9);
  margin-bottom: 45px;
`;

const ContentBox = styled.div`
  width: 360px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
`;

const SigninBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PasswordShowStatus = styled.p`
  :hover {
    color: #a9abae;
  }
  cursor: pointer;
  position: absolute;
  margin-left: ${(props) => props.marginLeft};
  margin-top: -35px;
  color: rgb(38, 38, 38);
  font-weight: 600;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Login = styled.p`
  color: rgb(38, 38, 38);
  font-family: none;
  font-size: 14px;
  margin: 15px;
`;

const LoginLink = styled.a`
  color: rgb(0, 149, 246);
  font-family: none;
  text-decoration: none;
  font-weight: 600;
`;
