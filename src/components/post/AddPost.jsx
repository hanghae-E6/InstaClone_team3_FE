import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AWS from "aws-sdk";
import { loginCheck } from "../../apis/api";
import uploadImg from "../../assets/imgupload.png";
import { __addPost } from "../../apis/postApi";

function AddPost() {
  useLayoutEffect(() => {
    loginCheck();
  }, []);

  const userId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [postImg, setPostImg] = useState("");
  const [prevImg, setPrevImg] = useState("");

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPrevImg(reader.result);
      };
      setPostImg(file);
    }
  };

  const HandleTextChange = (e) => {
    setContent(e.target.value);
  };

  const HandleSubmitPost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postImg", postImg);
    formData.append("content", content);

    dispatch(__addPost({ formData, navigate }));
  };

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
        <TopWrapper>
          <TitleAdd>새 게시물 만들기</TitleAdd>
          <SubmitBtn onClick={HandleSubmitPost}>공유하기</SubmitBtn>
        </TopWrapper>
        <ContentsWrapper>
          <ImageUpload>
            <ImagePreviewBox>
              {prevImg ? (
                <img id="preview" alt="미리보기" src={prevImg} width="100px" />
              ) : (
                <img
                  id="preview"
                  alt="미리보기"
                  src={uploadImg}
                  width="100px"
                />
              )}
            </ImagePreviewBox>
            <div>
              <Img src={postImg} alt="" style={{ marginBottom: "10px" }} />
              <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif"
                onChange={handleFileInput}
              ></input>
            </div>
          </ImageUpload>
          <ContentUpload>
            <UserBox userInfo={{ userId }} />
            <TextArea
              placeholder="문구 입력..."
              onChange={HandleTextChange}
              maxLength="2000"
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

const Img = styled.img`
  max-width: 400px;
  max-height: 400px;
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
  max-height: 200px;
  overflow-y: hidden;
`;

export default AddPost;
