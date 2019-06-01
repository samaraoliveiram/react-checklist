import React from "react";
import { styled, theme } from "./Theme";

const Box = styled.div`
  padding: ${theme.sizes.sm} ${theme.sizes.md} ${theme.sizes.sm};
  background-color: ${theme.colors.base.darkest};
  box-shadow: 2px 2px 5px ${theme.colors.base.darker};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const HUser: React.FC = () => {
  return <Box />;
};
