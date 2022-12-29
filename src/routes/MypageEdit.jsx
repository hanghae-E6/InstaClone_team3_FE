import React, { useState } from "react";
import useSetUser from "../hooks/useSetUser";
import useInput from "../hooks/useInput";
import axios from "../../node_modules/axios/index";
import api, { imageApi } from "../apis/api";
import { SIGNUP_VALIDATION } from "../constants/validation";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import Input from "../components/common/Input";
import { Colors } from "../styles/colors";
import "../components/mypage_edit/style/mypage_edit.css";

const MypageEdit = () => {
  const user = useSetUser();
  const [newImage, setNewImage] = useState(null);
  const [fileForNickname, setFileForNickname] = useState(null);

  const [nickname, isNicknameValid, inputNickname] = useInput(
    "",
    SIGNUP_VALIDATION.NICKNAME
  );

  const fileInput = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setNewImage(reader.result);
        setFileForNickname(file);
      };

      formData.append("nickname", user.nickname);
      formData.append("profileImg", file);

      imageApi.put(`/api/user/${user.userId}`, formData).catch((e) => alert(e));
    }
  };

  const editNickname = () => {
    if (nickname !== user.nickname && isNicknameValid) {
      axios
        .get(
          process.env.REACT_APP_API_ENDPOINT +
            `/api/user/signup/findDup?nickname=${nickname}`
        )
        .then((res) => {
          if (res.status === 200) {
            if (fileForNickname) {
              const formData = new FormData();
              formData.append("nickname", nickname);
              formData.append("profileImg", fileForNickname);
              imageApi
                .put(`/api/user/${user.userId}`, formData)
                .then(window.location.assign(`/mypage/${user.userId}`))
                .catch((e) => alert(e));
            } else {
              api
                .put(`/api/user/${user.userId}`, {
                  nickname,
                  profileImg: user.profileImg,
                })
                .then(window.location.assign(`/mypage/${user.userId}`))
                .catch((e) => alert(e));
            }
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  };

  return (
    user && (
      <ProfileTemplate>
        <Wrap>
          <UserWrap>
            <ProfileImg
              alt="profileImg"
              src={newImage ? newImage : user.profileImg}
            />
            <UserRightWrap>
              <UserName>{user.nickname}</UserName>
              <div>
                <ImgInputLabel>프로필 사진 바꾸기</ImgInputLabel>
                <ImgInput
                  type="file"
                  accept="image/png, image/jpg"
                  onChange={fileInput}
                />
              </div>
            </UserRightWrap>
          </UserWrap>
          <NicknameInputWrap>
            <NicknameInputLabel>사용자 이름</NicknameInputLabel>
            <Input
              className="nickname-edit-input"
              value={nickname}
              onChange={inputNickname}
              style={{
                fontSize: "18px",
                height: "28px",
                width: "200px",
                backgroundColor: "rgb(255, 255, 255)",
                borderRadius: "3px",
                padding: "0px 8px",
              }}
            ></Input>
          </NicknameInputWrap>
          <Button onClick={editNickname}>제출</Button>
        </Wrap>
      </ProfileTemplate>
    )
  );
};

const Wrap = styled.div`
  background-color: white;
  border: 1px solid ${Colors.grey};
  height: 600px;
  margin-top: 25px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserWrap = styled.div`
  width: 200px;
  height: 50px;
  margin-left: -210px;
  gap: 28px;
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`;

const UserRightWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 25px;
  font-weight: 400;
  color: rgb(38, 38, 38);
  margin-bottom: 25px;
`;

const ImgInputLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: rgb(0, 149, 246);
  margin-left: 790px;
  margin-top: -20px;
`;

const ImgInput = styled.input`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  margin-left: -5px;
  margin-top: -20px;
  width: 120px;
  height: 15px;
`;

const NicknameInputWrap = styled.div`
  margin-left: -160px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: 30px;
  gap: 30px;
  display: flex;
  align-items: center;
`;

const NicknameInputLabel = styled.span`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: rgb(255, 255, 255);
  background-color: rgb(0, 149, 246);
  border: 1px solid transparent;
  border-radius: 4px;
  margin-left: -215px;
  padding: 5px 9px;
`;

export default MypageEdit;
