import React, { useState } from "react";
import useSetUser from "../hooks/useSetUser";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import Modal from "../components/common/Modal";
import { Colors } from "../styles/colors";
import axios from "../../node_modules/axios/index";
import api, { imageApi } from "../apis/api";
import { SIGNUP_VALIDATION } from "../constants/validation";

const MypageEdit = () => {
  const user = useSetUser();
  const [modalToggle, setModalToggle] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [fileForNickname, setFileForNickname] = useState(null);

  const [nickname, isNicknameValid, inputNickname] = useInput(
    user?.nickname,
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
          <div
            style={{
              display: "flex",
            }}
          >
            <ProfileImg
              alt="profileImg"
              src={newImage ? newImage : user.profileImg}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{user.nickname}</span>
              <input
                type="file"
                accept="image/png, image/jpg"
                onChange={fileInput}
              />
              <span onClick={() => setModalToggle((prev) => !prev)}>
                프로필 사진 바꾸기
              </span>
            </div>
            {modalToggle && <Modal visible />}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <span>사용자 이름</span>
            <input value={nickname} onChange={inputNickname}></input>
          </div>
          <button onClick={editNickname}>제출</button>
        </Wrap>
      </ProfileTemplate>
    )
  );
};

const Wrap = styled.div`
  height: 600px;
  border: 1px solid ${Colors.grey};
  background-color: white;
  margin-top: 25px;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
export default MypageEdit;
