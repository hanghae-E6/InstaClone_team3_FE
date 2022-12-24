import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";

const CommentList = () => {
  return (
    <CommentListWrapper>
      <CommentListBox>
        <CommentItem />
        <CommentItem />
      </CommentListBox>
    </CommentListWrapper>
  );
};

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  margin-bottom: 4px;
  min-height: 0;
  overflow: auto;
  position: relative;
  overflow-x: hidden;
`;

const CommentListBox = styled.ul`
  border: 0;
  box-sizing: content-box;
  flex-grow: 1;
  font: inherit;
  font-size: 100%;
  width: auto;
  height: auto;
  left: 0;
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  position: absolute;
  scrollbar-width: none;
  vertical-align: baseline;
`;
export default CommentList;