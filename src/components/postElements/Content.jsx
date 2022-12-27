import React from "react";
import styled from "styled-components";

function Content() {
  return (
    <Description>
      <DesSpan>zzzhaehae </DesSpan> 게시글 게시글 게시글 게시글 게시글 게시글
      게시글 게시글 게시글 게시글 게시글 게시글 게시글 게시글 게시글 게시글
      게시글 게시글 게시글
    </Description>
  );
}

const Description = styled.p`
  margin: 10px 0;
  font-size: 14px;
  line-height: 20px;
`;

const DesSpan = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export default Content;
