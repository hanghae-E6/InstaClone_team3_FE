import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UserBox from "../postElements/UserBox";
import { AiOutlineHeart } from "react-icons/ai";
import CountLike from "../postElements/CountLike";
import Content from "../postElements/Content";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import {
  __deletePost,
  __getPostDetail,
  __togglePostLikes,
} from "../../apis/postApi";
import useInputs from "../../hooks/useInputs";
import { __addComment } from "../../apis/commentApi";
import { loginCheck } from "../../apis/api";
import { MdMoreHoriz } from "react-icons/md";
import ButtonsModal from "../common/ButtonsModal";
import api from "../../apis/api";

function DetailPost() {
  const { state } = useLocation();
  const loggedinUserId = localStorage.getItem("userId");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [comment, setComment, commentHandler] = useInputs("");
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState("");
  const [postId, setPostId] = useState("");

  // 팝업 open
  const showPopup = () => {
    setFlag(true);
  };

  // 팝업 close
  const closePopup = () => {
    setFlag(false);
  };

  // 게시글상세 조회
  const getPostDetail = () => {
    dispatch(__getPostDetail(params?.postId)).then((res) => {
      const { type, payload } = res;

      if (type === "getPostDetail/fulfilled") {
        setPost(payload.post);
        setComments(payload.comments);
        setUserId(payload.post.userId);
        setPostId(String(payload.post.postId));
      } else if (type === "getPostDetail/rejected") {
        alert("알 수 없는 에러입니다.");
        navigate("/");
      }
    });
  };

  // 화면 로드 시 게시글상세 조회
  useEffect(() => {
    loginCheck();
    getPostDetail();
  }, []);

  //게시글 삭제
  const HandleDeletePost = () => {
    dispatch(__deletePost({ postId, navigate }));
  };

  //게시글 수정페이지로 이동
  const HandleModifyPost = () => {
    navigate(`/write/${postId}`);
  };

  // 댓글 등록
  const onAddComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요.");
      return;
    }
    dispatch(__addComment({ postId: params?.postId, comment })).then((res) => {
      const { type } = res;

      if (type === "addComment/fulfilled") {
        alert("댓글이 정상적으로 등록되었습니다.");
        setComment("");
        getPostDetail();
      }
    });
  };

  // 게시글 좋아요 버튼 클릭
  const onTogglePostLikes = () => {
    dispatch(__togglePostLikes(params?.postId)).then((res) => {
      const { payload, type } = res;
      if (type === "togglePostLikes/fulfilled") {
        alert(`${payload.message}`);
        getPostDetail();
      }
    });
  };

  return (
    <BackGround>
      <CgClose
        className="close"
        size={25}
        onClick={() => {
          // 이전페이지가 마이페이지면 다시 마이페이지로 돌아가고 그게 아니면 메인으로 이동
          state === "mypage" ? navigate(-1) : navigate("/");
        }}
        style={{
          color: "white",
          position: "absolute",
          right: "4rem",
          top: "3rem",
          cursor: "pointer",
          marginTop: "-35px",
        }}
      />
      <Wrapper>
        <StImage>
          <ImageWrapper>
            <PostingImage>
              <Element src={post?.postImg} alt="" />
            </PostingImage>
          </ImageWrapper>
        </StImage>
        <StDetail>
          <StProfile>
            <UserBox
              userInfo={{ userId: post?.userId, nickname: post?.nickname }}
            />
            {loggedinUserId === String(userId) ? (
              <MdMoreHoriz
                onClick={showPopup}
                size={25}
                style={{
                  color: "black",
                  position: "absolute",
                  right: "2rem",
                  top: "1rem",
                  cursor: "pointer",
                }}
              />
            ) : (
              ""
            )}
          </StProfile>
          <ButtonsModal
            visible={flag}
            width="400px"
            children={[
              { btnName: "삭제", btnHandler: HandleDeletePost },
              { btnName: "수정", btnHandler: HandleModifyPost },
            ]}
            onClose={closePopup}
          />
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
              <AiOutlineHeart size={25} onClick={onTogglePostLikes} />
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
  width: 980px;
  height: 700px;
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
  justify-content: space-between;
  display: flex;
  position: relative;
  border-bottom: 1px solid #dfdfdf;
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

// const StcommentInput = styled.div`
//   width: 100%;
//   height: 6%;
// `;

const PostTime = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
  margin-top: 7px;
`;

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

const CommentWrapper = styled.div`
  width: 100%;
  height: 43px;
  border-radius: 1px solid #dfdfdf;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CommentBox = styled.input`
  width: 100%;
  height: 75%;
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

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;

const PostingImage = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Element = styled.img`
  max-width: 300px;
  max-height: 700px;
`;
export default DetailPost;
