import React, { useState } from "react";
import useInput from "../hooks/useInput";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { SIGNUP_VALIDATION } from "../constants/validation";

import axios from "../../node_modules/axios/index";
import "../components/signup/style/signup.css";
import styled from "styled-components";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Signup = () => {
  const loginStatus = localStorage.getItem("refreshToken");

  const navigate = useNavigate();
  const [email, isEmailValid, inputEmail] = useInput(
    "",
    SIGNUP_VALIDATION.EMAIL
  );

  const [nickname, isNicknameValid, inputNickname, onClickRandomString] =
    useInput("", SIGNUP_VALIDATION.NICKNAME, email);

  const [password, isPasswordValid, inputPassword] = useInput(
    "",
    SIGNUP_VALIDATION.PASSWORD
  );

  const [emailDuplicateCheck, setEmailDuplicateCheck] = useState(false);

  const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState(false);

  const [emailMessage, setEmailMessage] = useState(false);

  const [nicknameMessage, setNicknameMessage] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState(false);

  const [showStatusToggle, setShowStatusToggle] = useState(false);

  const showPassword = {
    type: "password",
    text: "비밀번호 표시",
    validationMargin: "-167px",
    textMargin: "210px",
  };

  const hidePassword = {
    type: "text",
    text: "숨기기",
    validationMargin: "-122px",
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

  const onBlurEmail = () => {
    if (!isEmailValid || !email) {
      setEmailMessage(SIGNUP_VALIDATION.MESSAGE.WARNING);
    } else {
      axios
        .get(
          process.env.REACT_APP_API_ENDPOINT +
            `/api/user/signup/findDup?email=${email}`
        )
        .then((res) => {
          res.status === 200 &&
            setEmailMessage(SIGNUP_VALIDATION.MESSAGE.SUCCESS);
          setEmailDuplicateCheck(true);
        })
        .catch(() => {
          setEmailMessage(SIGNUP_VALIDATION.MESSAGE.WARNING);
          setEmailDuplicateCheck(false);
        });
    }
    checkInputValidated();
  };

  const onBlurNickname = () => {
    if (!isNicknameValid || !nickname) {
      setNicknameMessage(SIGNUP_VALIDATION.MESSAGE.WARNING);
    } else {
      axios
        .get(
          process.env.REACT_APP_API_ENDPOINT +
            `/api/user/signup/findDup?nickname=${nickname}`
        )
        .then((res) => {
          res.status === 200 &&
            setNicknameMessage(SIGNUP_VALIDATION.MESSAGE.SUCCESS);
          setNicknameDuplicateCheck(true);
        })
        .catch(() => {
          setNicknameMessage(SIGNUP_VALIDATION.MESSAGE.WARNING);
          setNicknameDuplicateCheck(false);
        });
    }
    checkInputValidated();
  };

  const onBlurPassword = () => {
    if (!isPasswordValid || !password) {
      setPasswordMessage(SIGNUP_VALIDATION.MESSAGE.WARNING);
    } else {
      setPasswordMessage(SIGNUP_VALIDATION.MESSAGE.SUCCESS);
    }
    checkInputValidated();
  };

  const [buttonDisableToggle, setButtonDisableToggle] = useState(true);

  const checkInputValidated = () => {
    if (
      isEmailValid &&
      isNicknameValid &&
      isPasswordValid &&
      emailDuplicateCheck &&
      nicknameDuplicateCheck &&
      Boolean(email) &&
      Boolean(nickname) &&
      Boolean(password)
    ) {
      setButtonDisableToggle(false);
    } else {
      setButtonDisableToggle(true);
    }
  };

  const postUserInfo = () => {
    if (!buttonDisableToggle) {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/api/user/signup", {
          email,
          nickname,
          password,
          profileImg: null,
        })
        .then((res) => res.status === 201 && navigate("/"))
        .catch(() => alert("회원가입에 실패했습니다."));
      return;
    }
  };

  return (
    !loginStatus && (
      <WrapAll>
        <Wrap>
          <WrapContentBox>
            <ContentBox>
              <Logo>Instar⭐gram</Logo>
              <SignupBox>
                <Intro>친구들의 사진과 동영상을 보려면 가입하세요.</Intro>
                <div className="signup-input-box">
                  <Input
                    className="signup-input"
                    placeholder="이메일 주소"
                    value={email}
                    onChange={inputEmail}
                    onBlur={onBlurEmail}
                    style={{
                      margin: "0 40px 10px",
                    }}
                  />
                  <label className="signup-label">이메일 주소</label>
                  <span className="message">{emailMessage}</span>
                </div>
                <div className="signup-input-box">
                  <Input
                    className="signup-input"
                    placeholder="사용자 이름"
                    value={nickname}
                    onChange={inputNickname}
                    onBlur={onBlurNickname}
                    style={{ margin: "0 40px 10px" }}
                  />
                  <label className="signup-label">사용자 이름</label>
                  {email && !nicknameMessage ? (
                    <RandomNickname onClick={onClickRandomString}>
                      {SIGNUP_VALIDATION.MESSAGE.DEFAULT}
                    </RandomNickname>
                  ) : (
                    <>
                      <span
                        className="message"
                        style={{
                          marginLeft: "-99px",
                        }}
                      >
                        {nicknameMessage}
                      </span>
                      {nicknameMessage && (
                        <RandomNickname onClick={onClickRandomString}>
                          {SIGNUP_VALIDATION.MESSAGE.DEFAULT}
                        </RandomNickname>
                      )}
                    </>
                  )}
                </div>
                <div className="signup-input-box">
                  <Input
                    className="signup-input"
                    type={passwordShowStatus.type}
                    placeholder="비밀번호"
                    value={password}
                    onChange={inputPassword}
                    onBlur={onBlurPassword}
                    style={{ margin: "0 40px 10px" }}
                  />
                  <label className="signup-label">비밀번호</label>
                  <span
                    className="message"
                    style={{
                      marginLeft: !password
                        ? "-71px"
                        : passwordShowStatus.validationMargin,
                    }}
                  >
                    {passwordMessage}
                  </span>
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
                  className="signup-button"
                  type="button"
                  onClick={postUserInfo}
                  margin="20px 40px 10px"
                  padding="6px 16px"
                  fontSize="initial"
                  borderRadius="7px"
                  disabled={buttonDisableToggle}
                >
                  가입
                </Button>
              </SignupBox>
            </ContentBox>
            <ContentBox>
              <Login>
                계정이 있으신가요? <LoginLink href="/">로그인</LoginLink>
              </Login>
            </ContentBox>
          </WrapContentBox>
        </Wrap>
      </WrapAll>
    )
  );
};

const WrapAll = styled.div`
  background-color: rgb(250, 250, 250);
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  display: flex;
`;

const WrapContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7%;
  margin-bottom: 7%;
  max-width: 350px;
`;

const Logo = styled.p`
  @import url("https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap");
  font-family: "Oleo Script", cursive;
  font-size: 35px;
  margin-top: calc(4px * 9);
  margin-bottom: 20px;
`;

const ContentBox = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(219, 219, 219);
  border-radius: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 10px;
  padding: 10px 0;
`;

const Intro = styled.h2`
  color: rgb(142, 142, 142);
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  margin: 0 40px 30px;
`;

const SignupBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const RandomNickname = styled.span`
  position: absolute;
  margin-left: -71px;
  margin-top: 7px;
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
`;

export default Signup;
