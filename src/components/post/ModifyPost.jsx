import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import { CgClose } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { imageApi, loginCheck } from "../../apis/api";
import api from "../../apis/api";
import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-northeast-2", // 버킷이 존재하는 리전을 문자열로 입력합니다. (Ex. "ap-northeast-2")
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-northeast-2:1bbf07d0-8045-44b0-8079-1af8ef68198e", // cognito 인증 풀에서 받아온 키를 문자열로 입력합니다. (Ex. "ap-northeast-2...")
  }),
});

function ModifyPost() {
  const userId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const navigate = useNavigate();
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
      // console.log("왁", res);
      setCurrentImg(res.data.post.postImg);
      setContent(res.data.post.content);
    });
  }, []);

  const albumBucketName = "imagebucketforcloneinsta";
  const handleFileModify = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPrevImg(reader.result);
      };
      setNewImg(file);

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
        function () {
          alert("이미지 업로드에 성공했습니다.");
        },
        function (err) {
          return alert("오류가 발생했습니다: ", err.message);
        }
      );
    }
  };

  const HandleTextModify = (e) => {
    setContent(e.target.value);
  };

  const HandleModifyPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("postImg", newImg);
    formData.append("content", content);

    try {
      const res = await imageApi.put(`api/posts/${postId}`, formData);
      // console.log("모야", formData);
      // console.log("이거시", res);
      const { status, data } = res;
      if (status === 200) {
        alert(`${data.message}`);
        navigate(`/posts/${postId}`);
      }
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
