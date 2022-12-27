import React from "react";
import Template from "../components/layout/Template";
import PostCard from "../components/post/PostCard";

const Home = () => {
  return (
    <Template>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Template>
  );
};

export default Home;
