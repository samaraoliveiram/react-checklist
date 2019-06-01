import React from "react";
import { styled } from "../components/Theme";

const H1 = styled.h1`
  font-size: 40px;
  font-family: ${p => p.theme.fonts.Merriweather};
  color: ${p => p.theme.colors.base.lighter};
`;

const H2 = styled.h2`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.Titillium};
  color: ${p => p.theme.colors.base.ligh};
`;

const H3 = styled.h3`
  font-size: 22px;
`;

const D = styled.h4`
  font-size: 17px;
`;

export { H1, H2, H3, D };
