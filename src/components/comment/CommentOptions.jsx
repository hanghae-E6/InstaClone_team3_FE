import React, { useState } from "react";
import styled from "styled-components";
import { MdMoreHoriz } from "react-icons/md";
import ButtonsModal from "../common/ButtonsModal";

const CommentOptions = () => {
  const [flag, setFlag] = useState(false);

  const showPopup = () => {
    setFlag(true);
  };

  const closePopup = () => {
    setFlag(false);
  };

  const onCommentRemove = () => {
    console.log("삭제");
  };

  return (
    <>
      <CommentDetailWrapper>
        <li>좋아요 2개</li>
        <li>번역보기</li>
        <li>
          <MdMoreHoriz onClick={showPopup} />
        </li>
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
