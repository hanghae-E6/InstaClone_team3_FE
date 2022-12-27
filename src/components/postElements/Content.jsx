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
  max-height: 280px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const DesSpan = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

export default Content;
