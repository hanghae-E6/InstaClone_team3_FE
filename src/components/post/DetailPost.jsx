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
import { useParams } from "react-router";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { __getPostDetail } from "../../apis/postApi";
import useInputs from "../../hooks/useInputs";
import { __addComment } from "../../apis/commentApi";
// import IconBox from "../postElements/IconBox";

function DetailPost() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [comment, setComment, commentHandler] = useInputs("");

  // 화면 로드 시 게시글상세 조회
  useEffect(() => {
    dispatch(__getPostDetail(params?.postId)).then((res) => {
      const { type, payload } = res;

      if (type === "getPostDetail/fulfilled") {
        setPost(payload.post);
        setComments(payload.comments);
      } else if (type === "getPostDetail/rejected") {
        alert("알 수 없는 에러입니다.");
        navigate("/");
      }
    });
  }, []);

  // 댓글 등록
  const onAddComment = () => {
    dispatch(__addComment({ postId: params?.postId, comment })).then((res) => {
      const { type } = res;

      if (type === "addComment/fulfilled") {
        alert("댓글이 정상적으로 등록되었습니다.");
        setComment("");
        window.location.href = `/posts/${params?.postId}`;
      }
    });
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
        <StImage>
          <Image src={post?.postImg} />
        </StImage>
        <StDetail>
          <StProfile>
            <UserBox
              userInfo={{ userId: post?.userId, nickname: post?.nickname }}
            />
          </StProfile>
          <StContent>
            <Content
              contentInfo={{ nickname: post?.nickname, content: post?.content }}
            />
            <CommentList comments={comments} postId={params?.postId} />
          </StContent>
          <StLikes>
            {/* 댓글 아이콘 클릭 시 모달 중복으로 뜨는 문제로 수정했습니다.-전유진 */}
            {/* <IconBox/> */}
            <ReactionWrapper>
              <AiOutlineHeart size={25} />
              <img src="img/save.PNG" className="save icon" alt="" />
            </ReactionWrapper>
            <CountLike likes={post?.likes} />
            <PostTime>{post?.createdAt}</PostTime>
          </StLikes>
          <CommentWrapper>
            <img src="img/smile.PNG" className="icon" alt="" />
            <CommentBox
              type="text"
              placeholder="댓글 달기"
              value={comment}
              onChange={commentHandler}
            />
            <CommentBtn onClick={onAddComment}>게시</CommentBtn>
          </CommentWrapper>
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

const CommentWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentBox = styled.input`
  width: 80%;
  height: 80%;
  border: none;
  outline: none;
  font-size: 14px;
`;

const CommentBtn = styled.span`
  width: 50px;
  background: none;
  border: none;
  outline: none;
  font-size: 14px;
  color: rgb(0, 162, 255);
  cursor: pointer;
  font-weight: bold;
`;
export default DetailPost;
