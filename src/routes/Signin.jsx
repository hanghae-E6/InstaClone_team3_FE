// view 구현을 위해 만든 임시 페이지입니다.
// 로그인 기능 완료 시 Home에 token 값 유무에 따라 로그인 또는 메인 페이지를 보여주도록 합칠 예정입니다.

import React from "react";
import styled from "styled-components";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import SliderContainer from "../components/signin/SliderContainer";

const Signin = () => {
  return (
    <WrapAll>
      <Wrap>
        <SliderContainer />
        <WrapContentBox>
          <ContentBox>
            <Logo>Instar⭐gram</Logo>
            <FormBox>
              <Form>
                <Input
                  style={{ margin: "0 40px 10px", minWidth: "255px" }}
                  placeholder="전화번호, 사용자 이름 또는 이메일"
                />
                <Input
                  style={{ margin: "0 40px 10px" }}
                  placeholder="비밀번호"
                />
                <Button
                  margin="10px 40px 10px"
                  padding="6px 16px"
                  fontSize="initial"
                  letterSpacing="-1px"
                  borderRadius="8px"
                >
                  로그인
                </Button>
              </Form>
            </FormBox>
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

const FormBox = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
