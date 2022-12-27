import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import CommentLogo from "../../assets/comment.png";
import DmLogo from "../../assets/dm.png";
import Modal from "../common/Modal";
import DetailPost from "../post/DetailPost";

function IconBox() {
  const [flag, setFlag] = useState(false);

  const showPopup = () => {
    setFlag(true);
  };

  const closePopup = () => {
    setFlag(false);
  };
  return (
    <ReactionWrapper>
      <AiOutlineHeart size={25} />
      <img
        src={CommentLogo}
        style={{ width: "23px", marginLeft: "10px" }}
        class="icon"
        alt="comment"
        onClick={showPopup}
      />
      <Modal visible={flag} onClose={closePopup}>
        <DetailPost></DetailPost>
      </Modal>
      <img
        src={DmLogo}
        style={{ width: "22px", marginLeft: "10px" }}
        class="icon"
        alt=""
      />
      <img src="img/save.PNG" class="save icon" alt="" />
    </ReactionWrapper>
  );
}

const ReactionWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

export default IconBox;
