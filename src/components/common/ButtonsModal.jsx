import { createPortal } from "react-dom";
import styled from "styled-components";

const ButtonsModal = ({ visible, width, children, onClose }) => {
  const portalDiv = document.querySelector("#modal-root");
  if (!portalDiv) {
    return null;
  }
  return (
    <>
      {visible &&
        createPortal(
          <Background visible={visible}>
            <ModalBox width={width}>
              <ButtonsBox>
                {children.map(({ btnName, btnHandler }) => (
                  <button onClick={() => btnHandler()} key={btnName}>
                    {btnName}
                  </button>
                ))}
                <button onClick={onClose}>취소</button>
              </ButtonsBox>
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
  max-width: 700px;
  width: ${({ width }) => width};
  margin: auto;
  border-radius: 8px;
`;

const ButtonsBox = styled.div`
  align-items: stretch;
  border: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  position: relative;
  vertical-align: baseline;

  button {
    background-color: transparent;
    border-bottom: 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid rgb(219, 219, 219);
    cursor: pointer;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    min-height: 48px;
    padding: 4px 8px;
    text-align: center;
    vertical-align: middle;
  }
`;

export default ButtonsModal;
