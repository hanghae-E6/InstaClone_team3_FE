import React from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Section from "../components/layout/Section";

const Home = () => {
  return (
    <Section>
      <div>
        <Button btnTheme="primary" width="100px" height="30px">
          primary
        </Button>
        <Button btnTheme="secondary" width="100px" height="30px">
          secondary
        </Button>
      </div>
      <hr />
      <div>
        <Input type="text" placeholder="공통 인풋입니다" width="150px" />
      </div>
    </Section>
  );
};

export default Home;
