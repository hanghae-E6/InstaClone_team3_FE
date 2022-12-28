import { useLayoutEffect, useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSetUser from "../hooks/useSetUser";
import { loginCheck } from "../apis/api";
import api from "../apis/api";
import { __getPostsByUserId } from "../apis/postApi";
import { __getFollowList } from "../apis/userApi";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import Button from "../components/common/Button";
import { Colors } from "../styles/colors";
import "../components/mypage/style/mypage.css";
import MyPost from "../components/mypage/MyPost";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    // 유저 게시글 조회
    dispatch(__getPostsByUserId(userId)).then((res) => {
      const { type, payload } = res;
      if (type === "getPostsByUserId/fulfilled") {
        setUserPosts(payload.posts.reverse());
      }
    });
    // 팔로잉/팔로워 목록 조회
    dispatch(__getFollowList(userId)).then((res) => {
      console.log(res);
    });
  }, [userId]);

  const goToMypageEdit = () => {
    navigate(`/mypage/${userId}/edit`);
  };

  return (
    user &&
    userPosts && (
      <ProfileTemplate>
        <UpperWrap>
          <UserImage alt="userImg" src={user.profileImg} />
          <UserInfo>
            <Profile>
              <UserName>{user.nickname}</UserName>
              {localStorage.getItem("userId") === userId ? (
                <Button
                  btnTheme="secondary"
                  width="105px"
                  height="32px"
                  onClick={goToMypageEdit}
                >
                  프로필 편집
                </Button>
              ) : (
                <Button btnTheme="secondary" width="105px" height="32px">
                  팔로우
                </Button>
              )}
            </Profile>
            <Counter>
              <div>
                게시물
                <Count>{userPosts.length}</Count>
              </div>
              <div>
                팔로워
                <Count>{0}</Count>
              </div>
              <div>
                팔로우
                <Count>{0}</Count>
              </div>
            </Counter>
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

const Counter = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: rgb(38, 38, 38);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  display: flex;
  flex-direction: row;
  div {
    margin-right: 40px;
    width: max-content;
  }
`;

const Count = styled.span`
  font-weight: 600;
  margin-left: 5px;
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

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: 18px;
  }
`;

export default Mypage;
