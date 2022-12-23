import React, { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Section from "../components/layout/Section";

const Demo = () => {
  const [flag, setFlag] = useState(false);

  const showPopup = () => {
    setFlag(true);
  };

  const closePopup = () => {
    setFlag(false);
  };

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
      <hr />
      <div>
        <Button
          btnTheme="primary"
          width="100px"
          height="30px"
          onClick={showPopup}
        >
          popup
        </Button>
      </div>
      <Modal
        visible={flag}
        title="Demo"
        children={
          <>
            <p>hello</p>
          </>
        }
        onClose={closePopup}
      />
    </Section>
  );
};

export default Demo;
