import React from "react";
import styled from "styled-components";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Signup = () => {
  return (
    <WrapAll>
      <Wrap>
        <WrapContentBox>
          <ContentBox>
            <Logo>Instar⭐gram</Logo>
            <FormBox>
              <Form>
                <Intro>친구들의 사진과 동영상을 보려면 가입하세요.</Intro>
                <Input
                  style={{ margin: "0 40px 10px" }}
                  placeholder="휴대폰 번호 또는 이메일 주소"
                />
                <Input style={{ margin: "0 40px 10px" }} placeholder="성명" />
                <Input
                  style={{ margin: "0 40px 10px" }}
                  placeholder="사용자 이름"
                />
                <Input
                  style={{ margin: "0 40px 10px" }}
                  placeholder="비밀번호"
                />
                <Button margin="20px 40px 10px" padding="7px 16px!important">
                  가입
                </Button>
              </Form>
            </FormBox>
          </ContentBox>
          <ContentBox>
            <Login>
              계정이 있으신가요? <LoginLink href="/">로그인</LoginLink>
            </Login>
          </ContentBox>
        </WrapContentBox>
      </Wrap>
    </WrapAll>
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
  margin-top: 5.3%;
  margin-bottom: 5.3%;
  max-width: 350px;
`;

const Logo = styled.span`
  @import url("https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap");
  font-family: "Oleo Script", cursive;
  font-size: 47px;
  margin-top: calc(4px * 9);
  margin-bottom: 15px;
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
`;

export default Signup;
