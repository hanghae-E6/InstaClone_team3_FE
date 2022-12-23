import styled from "styled-components";

const Input = ({ width, height = "26px", ...props }) => {
  return <StInput width={width} height={height} {...props} />;
};

const StInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: 150px;
  background: #fafafa;
  border: 1px solid rgb(219, 219, 219);
  flex: 1 0 auto;
  margin: 0;
  outline: none;
  overflow: hidden;
  padding: 5px 8px;
  text-overflow: ellipsis;
  border-radius: 2px;
  font-size: 12px;
`;

export default Input;
