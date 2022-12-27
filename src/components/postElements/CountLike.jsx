import React from "react";
import styled from "styled-components";

function CountLike({ likes }) {
  return <Likes>좋아요 {likes}개</Likes>;
}

const Likes = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

export default CountLike;
