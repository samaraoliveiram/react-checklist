import "styled-components";

import { Theme } from "../Theme";


declare module "styled-components" {
  // export type DefaultTheme = typeof Theme;
  interface DefaultTheme extends Theme {}
}
