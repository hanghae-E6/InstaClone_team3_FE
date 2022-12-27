import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import Button from "../common/Button";
import UserBox from "../postElements/UserBox";
// import { __addPost } from "../../lib/postApi";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ImgUpload from "../../assets/imgupload.png";
import AWS from "aws-sdk";
// import { __addPosts } from "../../apis/postApi";
import axios from "../../../node_modules/axios/index";
import imageApi from "../../apis/api";

function AddPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const albumBucketName = "imagebucketforcloneinsta";
  const [content, setContent] = useState("");
  const [postImg, setPostImg] = useState("");
  const [prevImg, setPrevImg] = useState("");

  AWS.config.update({
    region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:1bbf07d0-8045-44b0-8079-1af8ef68198e", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
    }),
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setPrevImg(
      `https://imagebucketforcloneinsta.s3.ap-northeast-2.amazonaws.com/${file.name}`
    );
    setPostImg(file);
    // S3 SDK에 내장된 업로드 함수
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName, // 업로드할 대상 버킷명
        Body: file, // 업로드할 파일 객체
        ContentType: file.type,
        Key: file.name, // 업로드할 파일명 (* 확장자를 추가해야 합니다!)
      },
    });

    const promise = upload.promise();

    promise.then(
      function (data) {
        alert("이미지 업로드에 성공했습니다.");
      },
      function (err) {
        return alert("오류가 발생했습니다: ", err.message);
      }
    );
  };

  const HandleTextChange = (e) => {
    setContent(e.target.value);
  };

  const HandleSubmitPost = async (e) => {
    e.preventDefault();
    // dispatch(__addPosts({ postImg, content }));
    const formData = new FormData();
    formData.append("postImg", postImg);
    formData.append("content", content);

    try {
      const res = await imageApi.post("/api/posts", formData);
      console.log(res);
    } catch (e) {
      alert(e.response.data.errorMessage);
    }
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
            {postImg ? (
              <Img src={prevImg} alt="게시물 사진" />
            ) : (
              <div>
                <Img src={ImgUpload} alt="" style={{ marginBottom: "10px" }} />
                <div size="20px">사진과 동영상을 여기에 끌어다 놓으세요</div>
                <input type="file" onChange={handleFileInput}></input>
              </div>
            )}
          </ImageUpload>
          <ContentUpload>
            <UserBox />
            <TextArea placeholder="문구 입력..." onChange={HandleTextChange} />
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
  width: 95%;
  height: 85%;
  &:focus {
    outline: none;
  }
`;

export default AddPost;
