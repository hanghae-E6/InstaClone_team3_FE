import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import { CgClose } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { loginCheck } from "../../apis/api";
import { useDispatch } from "react-redux";
import api from "../../apis/api";
import AWS from "aws-sdk";
import { __modifyPost } from "../../apis/postApi";

AWS.config.update({
  region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_AWS_KEY, // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
  }),
});

function ModifyPost() {
  const userId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const [currentImg, setCurrentImg] = useState("");
  const [newImg, setNewImg] = useState("");
  const [content, setContent] = useState("");
  const [prevImg, setPrevImg] = useState("");

  useLayoutEffect(() => {
    loginCheck();
  }, []);

  useEffect(() => {
    const getCurrentPost = async () => {
      const data = await api.get(`api/posts/${postId}`);
      return data;
    };
    getCurrentPost().then((res) => {
      setCurrentImg(res.data.post.postImg);
      setContent(res.data.post.content);
    });
  }, []);

  const handleFileModify = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPrevImg(reader.result);
      };
      setNewImg(file);
    }
  };

  const HandleTextModify = (e) => {
    setContent(e.target.value);
  };

  const HandleModifyPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postImg", newImg);
    formData.append("content", content);

    dispatch(__modifyPost({ formData, navigate, postId }));
  };

  return (
    <BackGround>
      <CgClose
        className="close"
        size={25}
        onClick={() => {
          navigate(`/posts/${postId}`);
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
        <TopWrapper>
          <TitleAdd>정보 수정</TitleAdd>
          <SubmitBtn onClick={HandleModifyPost}>완료</SubmitBtn>
        </TopWrapper>
        <ContentsWrapper>
          <ImageUpload>
            <ImagePreviewBox>
              {!prevImg ? (
                <img alt="기존이미지" src={currentImg} width="100px" />
              ) : (
                <img alt="수정이미지" src={prevImg} width="100px" />
              )}
            </ImagePreviewBox>
            <div>
              <input type="file" onChange={handleFileModify}></input>
            </div>
          </ImageUpload>
          <ContentUpload>
            <UserBox userInfo={{ userId }} />
            <TextArea
              placeholder="문구 입력..."
              value={content}
              onChange={HandleTextModify}
            />
          </ContentUpload>
        </ContentsWrapper>
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

const Wrapper = styled.form`
  background-color: white;
  width: 700px;
  height: 450px;
  border-radius: 10px;
`;

const TopWrapper = styled.div`
  display: flex;
  width: 700px;
  height: 8%;
  border-bottom: 1px solid #bcbcbc;
  position: relative;
`;

const TitleAdd = styled.span`
  position: absolute;
  top: 10px;
  left: 300px;
`;

const SubmitBtn = styled.span`
  position: absolute;
  right: -3px;
  top: 2px;
  margin: 10px 20px;
  cursor: pointer;
  color: #0095f6;
  font-size: 14px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 92%;
`;

const ImageUpload = styled.div`
  display: flex;
  width: 60%;
  height: 100%;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #bcbcbc;
`;

const ContentUpload = styled.div`
  width: 40%;
  height: 100%;
`;

const TextArea = styled.textarea`
  border: none;
  height: 340px;
  width: 265px;
  &:focus {
    outline: none;
  }
`;

const ImagePreviewBox = styled.div`
  margin: 10px;
`;

export default ModifyPost;
