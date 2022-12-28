import React from "react";
import styled from "styled-components";
import ProfileSideBar from "../user/ProfileSideBar";
import Header from "./Header";
import Section from "./Section";

const Template = ({ children }) => {
  return (
    <TemplateWrapper>
      <Header />
      <Section>{children}</Section>
      <ProfileSideBar />
    </TemplateWrapper>
  );
};

const TemplateWrapper = styled.div`
  background-color: #fafafa;
  display: flex;
  &:div {
    flex-direction: row;
  }
`;
export default Template;
