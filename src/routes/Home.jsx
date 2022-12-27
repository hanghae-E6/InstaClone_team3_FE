import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Template from "../components/layout/Template";
import PostCard from "../components/post/PostCard";
import { __getPosts } from "../apis/postApi";

const Home = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  // To-Do: 페이지네이션 조회 API 개발되면 무한스크롤 적용할 예정
  useEffect(() => {
    dispatch(__getPosts()).then((res) => {
      const { type, payload } = res;
      if (type === "getPosts/fulfilled") {
        setPosts(payload.posts);
      }
    });
  }, [dispatch, setPosts]);

  return (
    <Template>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} />
      ))}
    </Template>
  );
};

export default Home;
