import React from "react";
import styled from "styled-components";
import Header from "./Header";

const ProfileTemplate = ({ children }) => {
  return (
    <TemplateWrapper>
      <Header />
      <DefaultSection>{children}</DefaultSection>
    </TemplateWrapper>
  );
};

const TemplateWrapper = styled.div`
  background-color: #fafafa;
`;

const DefaultSection = styled.div`
  max-width: 935px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0 336px;
  box-sizing: content-box;
  margin: 0 auto;
`;

export default ProfileTemplate;
