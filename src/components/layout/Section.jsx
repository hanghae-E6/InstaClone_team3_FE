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
  width: calc(100% - 40px);
  max-width: 935px;
  min-width: 780px;
  justify-content: normal;
  padding: calc(4vh) 20px 0;
  box-sizing: content-box;
  justify-content: center;
  padding: 40px 20px;
`;

export default Section;
