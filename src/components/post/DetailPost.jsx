import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import { AiOutlineHeart } from "react-icons/ai";
// import CommentLogo from "../../assets/comment.png";
import Image from "../postElements/Image";
import CountLike from "../postElements/CountLike";
import Content from "../postElements/Content";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { __getPostDetail } from "../../apis/postApi";
// import IconBox from "../postElements/IconBox";

function DetailPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [comments, setComments] = useState([]);

  const { content, createdAt, likes, nickname, userId, postId, postImg } =
    state;

  // 화면 로드 시 게시글상세 조회
  useEffect(() => {
    dispatch(__getPostDetail(postId)).then((res) => {
      const { type, payload } = res;

      if (type === "getPostDetail/fulfilled") {
        setComments(payload.comments);
      }
    });
  }, []);

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
        <StImage>
          <Image src={postImg} />
        </StImage>
        <StDetail>
          <StProfile>
            <UserBox userInfo={{ userId, nickname }} />
          </StProfile>
          <StContent>
            <Content contentInfo={{ nickname, content }} />
            <CommentList comments={comments} />
          </StContent>
          <StLikes>
            {/* 댓글 아이콘 클릭 시 모달 중복으로 뜨는 문제로 수정했습니다.-전유진 */}
            {/* <IconBox/> */}
            <ReactionWrapper>
              <AiOutlineHeart size={25} />
              <img src="img/save.PNG" className="save icon" alt="" />
            </ReactionWrapper>
            <CountLike likes={likes} />
            <PostTime>{createdAt}</PostTime>
          </StLikes>
          <StcommentInput>댓글 인풋 컴포넌트 들어갈 자리</StcommentInput>
        </StDetail>
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

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  width: 800px;
  height: 850px;
  border-radius: 10px;
`;

const StImage = styled.div`
  width: 45%;
  height: 100%;
`;

const StDetail = styled.div`
  width: 55%;
  height: 100%;
`;

const StProfile = styled.div`
  width: 100%;
  height: 8%;
`;

const StContent = styled.div`
  width: 100%;
  height: 72%;
  border-bottom: 1px solid #bcbcbc;
  overflow: hidden;
  padding-bottom: 15px;
`;

const StLikes = styled.div`
  width: 100%;
  height: 12%;
  border-bottom: 1px solid #bcbcbc;
`;

const StcommentInput = styled.div`
  width: 100%;
  height: 6%;
`;

const PostTime = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  margin-top: 10px;
`;

const ReactionWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;

export default DetailPost;
