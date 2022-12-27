import React from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import IconBox from "../postElements/IconBox";
import Image from "../postElements/Image";
import CountLike from "../postElements/CountLike";
import Content from "../postElements/Content";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function DetailPost() {
  const navigate = useNavigate();
  return (
    <BackGround>
      <CgClose
        className="close"
        size={25}
        onClick={() => {
          navigate("/");
        }}
        style={{
          color: "white",
          position: "absolute",
          right: "4rem",
          top: "3rem",
          cursor: "pointer",
        }}
      />
      <Wrapper>
        <StImage>
          <Image />
        </StImage>
        <StDetail>
          <StProfile>
            <UserBox />
          </StProfile>
          <StContent>
            <Content />
            댓글리스트 들어갈 자리
          </StContent>
          <StLikes>
            <IconBox />
            <CountLike />
          </StLikes>
          <StcommentInput>댓글 인풋 컴포넌트 들어갈 자리</StcommentInput>
        </StDetail>
      </Wrapper>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 700px;
  height: 450px;
  border-radius: 10px;
`;

const StImage = styled.div`
  width: 45%;
  height: 100%;
`;

const StDetail = styled.div`
  width: 55%;
  height: 100%;
  border-bottom: 1px solid #bcbcbc;
`;

const StProfile = styled.div`
  width: 100%;
  height: 10%;
`;

const StContent = styled.div`
  width: 100%;
  height: 60%;
  border-bottom: 1px solid #bcbcbc;
`;

const StLikes = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #bcbcbc;
`;

const StcommentInput = styled.div`
  width: 100%;
  height: 10%;
`;
export default DetailPost;
