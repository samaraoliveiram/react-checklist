import baseStyled, {
  ThemeProps,
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider as BaseThemeProvider,
  ThemeProviderComponent
} from "styled-components";

const colors = {
  base: {
    light: "#E7E5DF",
    grey: "#D3D0CB",
    dark: "#393E41",
    shadow: "#4B4F52"
  },
  secondary: {
    green: "#44BBA4",
    yellow: "#E7BB41"
  }
};

const sizes = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "40px"
};

export const theme = {
  colors,
  sizes
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const ThemeProvider = BaseThemeProvider as ThemeProviderComponent<Theme>;
