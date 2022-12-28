import React, { memo } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import Image from "../postElements/Image";
import CountLike from "../postElements/CountLike";
import Content from "../postElements/Content";
import CommentLogo from "../../assets/comment.png";
// import DmLogo from "../../assets/dm.png";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useInputs from "../../hooks/useInputs";
import { useDispatch } from "react-redux";
import { __addComment } from "../../apis/commentApi";

function PostCard({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [comment, setComment, commentHandler] = useInputs("");
  const { content, createdAt, likes, nickname, userId, postId, postImg } = post;

  // 댓글 등록
  const onAddComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요.");
      return;
    }
    dispatch(__addComment({ postId, comment })).then((res) => {
      const { type } = res;

      if (type === "addComment/fulfilled") {
        alert("댓글이 정상적으로 등록되었습니다.");
        setComment("");
      }
    });
  };

  const onDetailPage = () => {
    navigate(`/posts/${postId}`);
  };

  return (
    <Wrapper>
      <Post>
        {/* <Info> */}
        <UserBox userInfo={{ userId, nickname }} />
        {/* 더보기 옵션 들어갈곳 */}
        {/* </Info> */}
        <Image src={postImg} />
        <PostContent>
          <ReactionWrapper>
            <AiOutlineHeart size={25} />
            <img
              src={CommentLogo}
              style={{ width: "23px", marginLeft: "10px" }}
              className="icon"
              alt=""
              onClick={onDetailPage}
            />
            {/* <img
              src={DmLogo}
              style={{ width: "22px", marginLeft: "10px" }}
              className="icon"
              alt=""
            /> */}
            <img src="img/save.PNG" className="save icon" alt="" />
          </ReactionWrapper>
          {/* <Likes>좋아요 1만개</Likes> */}
          <CountLike likes={likes} />
          <Content contentInfo={{ nickname, content }} />
          {/* <Description>
            <DesSpan>zzzhaehae </DesSpan> 게시글 게시글 게시글 게시글 게시글
            게시글 게시글 게시글 게시글 게시글 게시글 게시글 게시글 게시글
            게시글 게시글 게시글 게시글 게시글
          </Description> */}
          <PostTime>{createdAt}</PostTime>
        </PostContent>
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
      </Post>
    </Wrapper>
    // <Wrapper>
    //   <div style={{ position: "absolute", top: "0px" }}>
    //     <UserBox />
    //   </div>
    //   <div>{/* <Image></Image> 게시글 이미지 */}</div>
    //   <div>{/* <Icon></Icon> 좋아요,댓글 아이콘 */}</div>
    //   <div>{/* <CountLike></CountLike> 좋아요 수 */}</div>
    //   <div>{/* <Content></Content> 게시글 본문 */}</div>
    //   <div>{/* <댓글></댓글> 댓글관련 컴포넌트 */}</div>
    // </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 470px;
  display: flex;
  flex-direction: column;
`;

// const LeftCol = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const Post = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  margin-top: 20px;
`;

// const Info = styled.div`
//   width: 100%;
//   height: 50px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-bottom: 1px solid #dfdfdf;
// `;

// const UserName = styled.p`
//   width: auto;
//   font-weight: bold;
//   color: #000;
//   font-size: 14px;
//   margin-left: 10px;
// `;

//   .info .options {
//     height: 10px;
//     cursor: pointer;
//   }

// const User = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ProfilePic = styled.div`
//   height: 40px;
//   width: 40px;
//   padding: 0;
//   background: none;
// `;

//   .info .profile-pic img {
//     border: none;
//   }

// const PostingImage = styled.div`
//   width: 100%;
//   height: auto;
//   text-align: center;
//   object-fit: cover;
// `;

const PostContent = styled.div`
  width: 100%;
  padding: 12px;
  /* padding: 0 10px; */
`;

// const Likes = styled.p`
//   font-size: 15px;
//   font-weight: bold;
// `;

// const Description = styled.p`
//   margin: 10px 0;
//   font-size: 14px;
//   line-height: 20px;
// `;

// const DesSpan = styled.span`
//   font-weight: bold;
//   margin-right: 10px;
// `;

const PostTime = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`;

const CommentWrapper = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//   .comment-wrapper .icon {
//     height: 30px;
//   }

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
//   .comment-btn,
//   .action-btn {
//     width: 70px;
//     height: 100%;
//     background: none;
//     border: none;
//     outline: none;
//     text-transform: capitalize;
//     font-size: 16px;
//     color: rgb(0, 162, 255);
//     opacity: 0.5;
//   }

const ReactionWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  img,
  svg {
    cursor: pointer;
  }
`;

//   .reaction-wrapper .icon {
//     height: 25px;
//     margin: 0;
//     margin-right: 20px;
//   }

//   .reaction-wrapper .icon.save {
//     margin-left: auto;
//   }
// const Wrapper = styled.div`
//   background-color: white;
//   display: flex;
//   flex-direction: column;
//   position: relative;
//   width: 470px;
//   height: 700px;
//   border-radius: 10px;
// `;
export default memo(PostCard);
