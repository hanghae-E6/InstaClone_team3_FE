import React from "react";
import styled from "styled-components";
// import PostImage from "../../assets/수지.jpg";

function Image({ src }) {
  return (
    <ImageWrapper>
      <PostingImage>
        <Element src={src} alt="" />
      </PostingImage>
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  display: table;
`;

const PostingImage = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

const Element = styled.img`
  max-width: 300px;
  max-height: 700px;
`;

export default Image;
