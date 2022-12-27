import React from "react";
import styled from "styled-components";

function Content({ contentInfo }) {
  return (
    <Description>
      <DesSpan>{contentInfo?.nickname} </DesSpan> {contentInfo?.content}
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
