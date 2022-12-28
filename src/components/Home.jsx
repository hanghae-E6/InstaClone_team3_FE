import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Template from "./layout/Template";
import PostCard from "./post/PostCard";
import { __getPostsByPageno } from "../apis/postApi";
import Loader from "./common/Loader";

let pageno = 1;
const Home = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  // 초기 데이터 조회
  const getInitData = async () => {
    setIsLoaded(true);
    dispatch(__getPostsByPageno(1)).then((res) => {
      const { type, payload } = res;
      if (type === "getPostsByPageno/fulfilled") {
        setPosts(payload.posts);
      }
    });
    setIsLoaded(false);
  };

  // 추가 데이터 조회
  const getMoreData = useCallback(async () => {
    // 추가 데이터를 로드하는 상태로 전환
    setIsLoaded(true);
    pageno++;
    dispatch(__getPostsByPageno(pageno)).then((res) => {
      const { type, payload } = res;
      if (type === "getPostsByPageno/fulfilled") {
        // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
        const mergedData = posts.concat(...payload.posts);
        setPosts(mergedData);
        // 추가 데이터 로드 끝
        setIsLoaded(false);
      } else if (type === "getPostsByPageno/rejected") {
        setTarget(null);
        setIsLoaded(false);
      }
    });
  }, [posts, dispatch]);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        getMoreData();
        observer.observe(entry.target);
      }
    },
    [getMoreData, isLoaded]
  );

  // 화면 최초 로드
  useEffect(() => {
    pageno = 1; // 메인 진입 시 pageno 초기화
    getInitData();
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return posts ? (
    <Template>
      {posts.map((post) => (
        <PostCard key={`${post.postId}${post.createdAt}`} post={post} />
      ))}
      {posts.length !== 0 ? (
        <div ref={setTarget} className="Target-Element">
          {isLoaded && <Loader />}
        </div>
      ) : (
        <>게시글이 없습니다.</>
      )}
    </Template>
  ) : (
    <>게시글이 없습니다.</>
  );
};

export default Home;
