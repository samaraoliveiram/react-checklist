import React from "react";
import { styled, theme } from "../components/Theme";
import { Icon } from "@blueprintjs/core";

const Circle = styled.div`
  display: flex;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.secondary.blue};
  border-radius: 100%;
  color: ${theme.colors.base.dark} !important;
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const Add: React.FC = () => {
  return (
    <Circle>
      <Icon icon="plus" iconSize={40} />
    </Circle>
  );
};
export { Add };
