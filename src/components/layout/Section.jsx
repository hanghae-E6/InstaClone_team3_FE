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
  margin: 0 auto;
  margin-left: 224px;
  min-width: 935px;
  min-height: 100vh;
  padding: calc(4vh) 20px 0;
  box-sizing: content-box;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fafafa;
`;

export default Section;
