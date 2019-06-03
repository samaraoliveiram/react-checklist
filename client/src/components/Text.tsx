import React from "react";
import { styled } from "../components/Theme";

const H1 = styled.h1`
  margin: 3px 3px;
  font-size: 50px;
  font-weight: 700;
`;

const H2 = styled.h2<{ light?: boolean }>`
  margin: 3px 3px;
  font-size: 35px;
  font-weight: 700;
  color: ${p =>
    p.light ? p.theme.colors.base.lightest : p.theme.colors.base.darkest};
`;

const H3 = styled.h3<{ light?: boolean }>`
  margin: 3px 3px;
  font-size: 22px;
  font-weight: 700;
  color: ${p =>
    p.light ? p.theme.colors.base.lightest : p.theme.colors.base.darkest};
`;
const H4 = styled.h3<{ light?: boolean }>`
  margin: 3px 3px;
  font-size: 15px;
  font-weight: 700;
  color: ${p =>
    p.light ? p.theme.colors.base.lightest : p.theme.colors.base.darkest};
`;
// const H5 = styled.h3`
//   font-size: 10px;
//   font-weight: 400;
//   color: ${p => p.theme.colors.base.darkest};
// `;

const P = styled.h4<{ light?: boolean }>`
  margin: 3px 3px;
  font-size: 13px;
  font-weight: 400;
  color: ${p =>
    p.light ? p.theme.colors.base.lightest : p.theme.colors.base.darkest};
`;

export { H1, H2, H3, H4, P };
