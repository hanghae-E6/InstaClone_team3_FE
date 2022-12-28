import "./style/signin.css";
import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import Input from "../common/Input";
import Button from "../common/Button";
import SliderContainer from "./SliderContainer";
import axios from "../../../node_modules/axios/index";

const Signin = () => {
  const [email, , inputEmail] = useInput("");

  const [password, , inputPassword] = useInput("");

  const [showStatusToggle, setShowStatusToggle] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

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
      setButtonDisableToggle(false);
    } else {
      setButtonDisableToggle(true);
    }
  };

  const onBlurPassword = () => {
    if (email && password) {
      setButtonDisableToggle(false);
    } else {
      setButtonDisableToggle(true);
    }
  };

  const signIn = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_ENDPOINT + "/api/user/login", {
        email,
        password,
      })
      .then((res) => {
        const { accesstoken, refreshtoken } = res.headers;
        const { userId } = res.data;
        localStorage.setItem("accessToken", accesstoken);
        localStorage.setItem("refreshToken", refreshtoken);
        localStorage.setItem("userId", userId);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 412) {
          setErrorMessage("잘못된 정보입니다. 다시 확인하세요.");
          localStorage.clear();
        } else {
          setErrorMessage("로그인에 실패하였습니다. 다시 시도해주세요.");
          localStorage.clear();
        }
      });
  };

  return (
    <WrapAll error={errorMessage}>
      <Wrap>
        <SliderContainer />
        <WrapContentBox>
          <ContentBox>
            <Logo>Instar⭐gram</Logo>
            <SigninForm onSubmit={signIn}>
              <div className="signin-input-box">
                <Input
                  className="signin-input"
                  value={email}
                  onChange={inputEmail}
                  onBlur={onBlurEmail}
                  style={{ margin: "0 40px 10px" }}
                  placeholder="이메일"
                />
                <label>이메일</label>
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
            </SigninForm>
            <ErrorMessage error={errorMessage}>{errorMessage}</ErrorMessage>
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
  padding: ${(props) => (!props.error ? "63px 0px" : "51px 0px")};
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

const SigninForm = styled.form`
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

const ErrorMessage = styled.p`
  color: rgb(237, 73, 86);
  font-size: 14px;
  margin-top: ${(props) => (props.error ? "10px" : "0px")};
  margin-bottom: ${(props) => (props.error ? "30px" : "0px")};
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
