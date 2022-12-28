import Button from "./Button";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useClickAway from "../../hooks/useClickAway";
import { CgClose } from "react-icons/cg";

const Modal = ({ visible, title, width, children, onSubmit, onClose }) => {
  const { ref } = useClickAway(onClose);
  const portalDiv = document.querySelector("#modal-root");
  if (!portalDiv) {
    return null;
  }
  return (
    <>
      {visible &&
        createPortal(
          <Background visible={visible}>
            <CgClose
              className="close"
              size={23}
              onClick={onClose}
              style={{
                color: "white",
                position: "absolute",
                right: "1rem",
                top: "1rem",
                cursor: "pointer",
              }}
            />
            <ModalBox ref={ref} width={width}>
              {/* <h3 style={{ textAlign: "center" }}>{title}</h3> */}
              <div>{children}</div>
              {/* <ButtonsBox>
                {onSubmit && <Button onClick={onSubmit}>제출하기</Button>}
                <Button
                  btnTheme="secondary"
                  onClick={onClose}
                  width="100px"
                  height="30px"
                >
                  뒤로가기
                </Button>
              </ButtonsBox> */}
            </ModalBox>
          </Background>,
          portalDiv
        )}
    </>
  );
};

const Background = styled.div`
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  z-index: 999;
  min-height: 100vh;
  padding-top: 12vh;
  padding-right: 15vw;
  padding-left: 15vw;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background-color: white;
  position: relative;
  z-index: 20;
  min-height: 140px;
  max-width: 700px;
  width: ${({ width }) => (width ? width : "auto")};
  /* padding: 30px 90px 30px 90px; */
  margin: auto;
  border-radius: 10px;
`;

// const ButtonsBox = styled.div`
//   display: flex;
//   justify-content: center;
//   grid-column-gap: 16px;
//   grid-row-gap: 16px;
//   padding: 16px;
// `;

export default Modal;
