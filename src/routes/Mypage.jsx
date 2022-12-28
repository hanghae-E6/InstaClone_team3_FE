import { useLayoutEffect, useState } from "react";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";
import { useParams } from "react-router-dom";
import useSetUser from "../hooks/useSetUser";
import api, { loginCheck } from "../apis/api";
import styled from "styled-components";
import ProfileTemplate from "../components/layout/ProfileTemplate";
import { Colors } from "../styles/colors";

const Mypage = () => {
  const navigate = useNavigate();
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
  }, []);

  return (
    user &&
    userPosts && (
      <ProfileTemplate>
        <div
          style={{
            display: "flex",
            width: "600px",
            marginLeft: "5px",
            gap: "105px",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <img
            alt="userImg"
            src={user.profileImg}
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <UserName>{user.nickname}</UserName>
            <PostsCounter>
              게시물
              <span
                style={{
                  fontWeight: "600",
                  marginLeft: "4px",
                }}
              >
                {userPosts.length}
              </span>
            </PostsCounter>
          </div>
        </div>
        <DivideLine></DivideLine>
        <div
          style={{
            marginLeft: "-90px",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            width: "1143px",
          }}
        >
          {userPosts.map((post) => {
            return (
              <Post key={post.postId}>
                <img
                  alt="postImg"
                  src={post.postImg}
                  style={{
                    width: "inherit",
                    height: "inherit",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/posts/${post.postId}`)}
                />
              </Post>
            );
          })}
        </div>
      </ProfileTemplate>
    )
  );
};

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

const Post = styled.div`
  width: 358px;
  height: 358px;
`;

export default Mypage;
