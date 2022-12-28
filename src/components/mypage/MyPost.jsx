import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import styled from "styled-components";
import { BsFillHeartFill } from "react-icons/bs";
import { BsFillChatFill } from "react-icons/bs";
import "./style/mypage.css";
import api from "../../apis/api";

import { useEffect, useState } from "react";

const MyPost = ({ post }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    api.get(`/api/posts/${post.postId}`).then((res) => {
      setLikes(res.data.post.likes);
      setComments(res.data.comments.length);
    });
  }, []);

  return (
    <Post className="post" key={post.postId}>
      <HoverEffect
        className="hover-effect"
        onClick={() => navigate(`/posts/${post.postId}`)}
      ></HoverEffect>
      <HoverIcons className="hover-icons">
        <BsFillHeartFill size={20} style={{ marginRight: "7px" }} />
        {likes}
        <BsFillChatFill
          size={20}
          style={{
            transform: "scaleX(-1)",
            marginRight: "7px",
            marginLeft: "30px",
          }}
        />
        {comments}
      </HoverIcons>
      <PostImage className="post-image" alt="postImg" src={post.postImg} />
    </Post>
  );
};

const Post = styled.div`
  width: 330px;
  height: 330px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HoverEffect = styled.div`
  cursor: pointer;
  background-color: rgb(0, 0, 0);
  width: inherit;
  height: inherit;
  opacity: 0;
  position: absolute;
`;

const HoverIcons = styled.div`
  width: fit-content;
  color: white;
  font-size: 20px;
  opacity: 0;
  position: absolute;
`;

const PostImage = styled.img`
  width: inherit;
  height: inherit;
`;

export default MyPost;
