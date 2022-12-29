import React, { useState } from "react";
import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import ButtonsModal from "../common/ButtonsModal";
import { useDispatch } from "react-redux";
import { __removeComment } from "../../apis/commentApi";
// import { __getTranslatedText } from "../../lib/commentApi";

const CommentOptions = ({ userId, commentId, postId }) => {
  const dispatch = useDispatch();
  const loggedinUserId = localStorage.getItem("userId"); // 로그인한 사용자의 userId
  const [flag, setFlag] = useState(false);

  // 팝업 open
  const showPopup = () => {
    setFlag(true);
  };

  // 팝업 close
  const closePopup = () => {
    setFlag(false);
  };

  // 댓글 삭제
  const onCommentRemove = () => {
    dispatch(__removeComment({ postId, commentId })).then((res) => {
      const { type, payload } = res;
      if (type === "removeComment/fulfilled") {
        alert(`${payload.message}`);
        closePopup(); // 팝업 close
        window.location.href = `/posts/${postId}`;
      } else if (type === "removeComment/rejected") {
        alert("알 수 없는 에러입니다.");
      }
    });
  };

  // 댓글 번역하기
  // const getTranslatedText = async () => {
  //   // dispatch(__getTranslatedText());
  // };

  return (
    <>
      <CommentDetailWrapper>
        {/* 시간 지연으로 번역보기 기믕 개발은 못함 */}
        {/* <li onClick={getTranslatedText}>번역보기</li> */}
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
  margin-left: 10px;
  li {
    font-size: 14px;
    color: #8e8e8e;
    display: inline;
    margin-right: 15px;
    cursor: pointer;
  }
`;
export default CommentOptions;
