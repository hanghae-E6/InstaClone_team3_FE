import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSetUser from "../hooks/useSetUser";
import api, { loginCheck } from "../apis/api";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import MyPost from "../components/mypage/MyPost";
import { Colors } from "../styles/colors";
import "../components/mypage/style/mypage.css";

const Mypage = () => {
  const { userId } = useParams();
  const user = useSetUser(userId);
  const [userPosts, setUserPosts] = useState(null);

  useLayoutEffect(() => {
    loginCheck();

    api
      .get(`/api/posts/user/${userId}`)
      .then((res) => {
        setUserPosts(res.data.posts.reverse());
      })
      .catch((e) => alert(e));
  }, [userId]);

  return (
    user &&
    userPosts && (
      <ProfileTemplate>
        <UpperWrap>
          <UserImage alt="userImg" src={user.profileImg} />
          <UserInfo>
            <UserName>{user.nickname}</UserName>
            <PostsCounter>
              게시물
              <PostsCount>{userPosts.length}</PostsCount>
            </PostsCounter>
          </UserInfo>
        </UpperWrap>
        <DivideLine></DivideLine>
        <PostsWrap>
          {userPosts.map((post) => {
            return <MyPost key={post.postId} post={post} />;
          })}
        </PostsWrap>
      </ProfileTemplate>
    )
  );
};

const UpperWrap = styled.div`
  display: flex;
  width: 600px;
  margin-left: 5px;
  gap: 105px;
  align-items: center;
  margin-top: 30px;
`;

const UserImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 34px;
  font-weight: 300;
  margin-bottom: 40px;
  color: rgb(38, 38, 38);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const PostsCounter = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgb(38, 38, 38);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const PostsCount = styled.span`
  font-weight: 600;
  margin-left: 4px;
`;

const DivideLine = styled.div`
  display: block;
  height: 0px;
  background-color: ${Colors.grey};
  width: 1133px;
  border: 1px solid ${Colors.grey};
  margin-left: -90px;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const PostsWrap = styled.div`
  margin-left: -90px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 1143px;
`;

export default Mypage;
