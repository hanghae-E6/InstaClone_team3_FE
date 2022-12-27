import React, { useState } from "react";
import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import ButtonsModal from "../common/ButtonsModal";
// import { useDispatch } from "react-redux";
// import { __getTranslatedText } from "../../lib/commentApi";

const CommentOptions = ({ userId }) => {
  const loggedinUserId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const [flag, setFlag] = useState(false);
  // const dispatch = useDispatch();

  const showPopup = () => {
    setFlag(true);
  };

  const closePopup = () => {
    setFlag(false);
  };

  const onCommentRemove = () => {
    console.log("삭제");
  };

  // 번역하기
  const getTranslatedText = async () => {
    // dispatch(__getTranslatedText());
  };

  return (
    <>
      <CommentDetailWrapper>
        <li>좋아요 2개</li>
        <li onClick={getTranslatedText}>번역보기</li>
        {/* 로그인한 사용자 아이디와 댓글을 쓴 사용자의 아이디가 같을때만 삭제할 수 있도록 한다. */}
        {loggedinUserId === String(userId) ? (
          <li>
            <MdMoreHoriz onClick={showPopup} />
          </li>
        ) : (
          ""
        )}
      </CommentDetailWrapper>
      <ButtonsModal
        visible={flag}
        width="400px"
        children={[{ btnName: "삭제", btnHandler: onCommentRemove }]}
        onClose={closePopup}
      />
    </>
  );
};

const CommentDetailWrapper = styled.ul`
  margin: 0 0 25px 55px;
  li {
    font-size: 14px;
    color: #8e8e8e;
    display: inline;
    margin-right: 15px;
    cursor: pointer;
  }
`;
export default CommentOptions;
