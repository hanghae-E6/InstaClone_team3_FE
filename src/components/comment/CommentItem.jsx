import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CommentOptions from "./CommentOptions";

const CommentItem = ({ commentInfo, postId }) => {
  const { nickname, comment } = commentInfo;

  return (
    <>
      <CommentWrapper>
        <Profile>
          <Link>
            <img src="https://i.ibb.co/8ryJ7Lf/image.jpg" alt="프로필" />
          </Link>
        </Profile>

        <CommentBox>
          <Comment>
            <Nickname>
              <Link>{nickname}</Link>
            </Nickname>
            {comment}
          </Comment>
        </CommentBox>
      </CommentWrapper>
      <CommentOptions
        userId={commentInfo.userId}
        commentId={commentInfo.commentId}
        postId={postId}
      />
    </>
  );
};

const CommentWrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5px 16px 13px 0;
  width: auto;
  word-wrap: break-word;
`;

const Profile = styled.div`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  cursor: pointer;
  margin-right: 15px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50px;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Nickname = styled.span`
  display: inline;
  margin-right: 4px;
  font-weight: bold;
`;

const Comment = styled.span`
  white-space: pre-wrap;
  color: rgb(38, 38, 38);
`;

export default memo(CommentItem);
