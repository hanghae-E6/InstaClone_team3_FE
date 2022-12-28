import React from "react";
import Follow from "./Follow";

const FollowingList = ({ followList }) => {
  return followList.length !== 0 ? (
    <div style={{ padding: "15px" }}>
      {followList.map((user) => (
        <Follow key={user.userId} user={user} />
      ))}
    </div>
  ) : (
    <div
      style={{
        padding: "15px",
        textAlign: "center",
        fontSize: "12px",
        lineHeight: 2,
      }}
    >
      팔로우하거나 팔로잉하는 모든 사람이 여기에 표시됩니다. <br />
      아직 당신을 팔로우하거나 혹은 당신이 팔로우하는 사람이 없습니다.
    </div>
  );
};

export default FollowingList;
