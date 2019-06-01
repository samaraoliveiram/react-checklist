import React from "react";
import { styled, theme } from "../components/Theme";
import { Icon as MIcon } from "@blueprintjs/core";

const Icon = styled(MIcon)`
  background-color: ${theme.colors.base.lighter};
  border-radius: 100%;
  color: ${theme.colors.base.darker} !important;
  position: fixed;
  bottom: 5%;
  right: 5%;
`;

const Add: React.FC = () => {
  return <Icon icon="add" iconSize={55} />;
};
export { Add };
