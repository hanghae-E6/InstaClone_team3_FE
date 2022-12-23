import React from "react";
import Header from "./Header";
import Section from "./Section";

const Template = ({ children }) => {
  return (
    <>
      <Header />
      <Section>{children}</Section>
    </>
  );
};

export default Template;
