import { useLayoutEffect, useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useSetUser from "../hooks/useSetUser";
import { loginCheck } from "../apis/api";
import api from "../apis/api";
import { __getPostsByUserId } from "../apis/postApi";
import { __getFollowList, __toggleFollow } from "../apis/userApi";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import Button from "../components/common/Button";
import { Colors } from "../styles/colors";
import "../components/mypage/style/mypage.css";
import MyPost from "../components/mypage/MyPost";
import Modal from "../components/common/Modal";
import FollowingList from "../components/mypage/FollowingList";

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSetUser(userId);
  const [userPosts, setUserPosts] = useState(null);
  const [followingList, setFollowingList] = useState([]); // 팔로잉 리스트
  const [followerList, setFollowerList] = useState([]); // 팔로워 리스트
  const [flag, setFlag] = useState(false);
  const [followFlag, setFollowFlag] = useState(null); // 팔로잉/팔로워 플래그

  const showPopup = (followFlag) => {
    setFlag(true);
    setFollowFlag(followFlag); // 팔로운지 팔로잉인지 구분하기 위함
  };

  const closePopup = () => {
    setFlag(false);
  };

  // 팔로잉/팔로워 목록 조회
  const getFollowList = () => {
    dispatch(__getFollowList(userId)).then((res) => {
      const { type, payload } = res;
      if (type === "getFollowList/fulfilled") {
        setFollowingList(payload.followList.following);
        setFollowerList(payload.followList.follower);
      }
    });
  };

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
    getFollowList();
  }, []);

  // 프로필편집페이지로 이동
  const goToMypageEdit = () => {
    navigate(`/mypage/${userId}/edit`);
  };

  // 팔로우 버튼 클릭
  const onClickFollow = () => {
    dispatch(__toggleFollow(userId)).then((res) => {
      const { type, payload } = res;
      if (type === "toggleFollow/fulfilled") {
        alert(`${payload.message}`);
        // 팔로잉/팔로워 목록 조회
        getFollowList();
      }
    });
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
                <Button
                  btnTheme="secondary"
                  width="105px"
                  height="32px"
                  onClick={() => onClickFollow()}
                >
                  팔로우
                </Button>
              )}
            </Profile>
            <Counter>
              <div>
                게시물
                <Count>{userPosts.length}</Count>
              </div>
              <div
                onClick={() => showPopup("follower")}
                style={{ cursor: "pointer" }}
              >
                팔로워
                <span
                  style={{
                    fontWeight: "600",
                    marginLeft: "4px",
                  }}
                >
                  {followerList.length}
                </span>
              </div>
              <div
                onClick={() => showPopup("following")}
                style={{ cursor: "pointer" }}
              >
                팔로우
                <span
                  style={{
                    fontWeight: "600",
                    marginLeft: "4px",
                  }}
                >
                  {followingList.length}
                </span>
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
        <Modal visible={flag} onClose={closePopup} width="400px">
          {followFlag === "following" ? (
            <FollowingList followList={followingList} />
          ) : (
            <FollowingList followList={followerList} />
          )}
        </Modal>
      </ProfileTemplate>
    )
  );
};

const UpperWrap = styled.div`
  display: flex;
  width: 600px;
  margin-left: 40px;
  gap: 115px;
  align-items: center;
  margin-top: 30px;
`;

const UserImage = styled.img`
  width: 170px;
  height: 170px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 40px;
  color: rgb(38, 38, 38);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Counter = styled.div`
  font-size: 18px;
  font-weight: 300;
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
  width: 1050px;
  border: 1px solid ${Colors.grey};
  margin-left: -40px;
  margin-top: 40px;
  margin-bottom: 30px;
`;

const PostsWrap = styled.div`
  margin-left: -41px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  width: 1055px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;

  button {
    margin-left: 18px;
  }
`;

export default Mypage;
