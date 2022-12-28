import PropTypes from "prop-types";
import styled from "styled-components";

const Section = ({ children }) => {
  return <DefaultSection>{children}</DefaultSection>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

const DefaultSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-left: 336px;
  width: 68%;
  min-height: 100vh;
  box-sizing: content-box;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

export default Section;
