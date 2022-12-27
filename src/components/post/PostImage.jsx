import React, { useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";

function PostImage() {
  const [imageSrc, setImageSrc] = useState("");
  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="게시물 사진" />
      ) : (
        <div>
          <span size="20px">사진과 동영상을 여기에 끌어다 놓으세요</span>
          <Button htmlFor="inputfile">컴퓨터에서 선택 </Button>
        </div>
      )}
    </div>
  );
}

export default PostImage;
