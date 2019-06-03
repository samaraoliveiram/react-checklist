import React from "react";
import { styled, theme } from "./Theme";

const HBox = styled.div`
  padding: ${theme.sizes.sm} ${theme.sizes.sm} ${theme.sizes.sm};
  background-color: ${theme.colors.base.darkest};
  box-shadow: 2px 2px 5px ${theme.colors.base.darker};
`;

export const Box: React.FC = ({ children }) => {
  return <HBox>{children}</HBox>;
};
