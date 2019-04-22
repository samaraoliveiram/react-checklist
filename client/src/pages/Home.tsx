import React from "react";
import { H1, Divider, ButtonGroup } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { styled } from "../components/Theme";

const Wrapper = styled.div`
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate3D(-50%, -50%, 0);
  margin-bottom: 10px;
`;

export default () => (
  <Wrapper>
    <H1>CheckList</H1>
    <ButtonGroup vertical={false}>
      <Link to="/signin">Sign in</Link>
      <Divider />
      <Link to="/signup">Sign up</Link>
    </ButtonGroup>
  </Wrapper>
);
