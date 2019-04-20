import baseStyled, {
  ThemeProps,
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider as BaseThemeProvider,
  ThemeProviderComponent
} from "styled-components";


const colors = {
    base: {
      main: "#59CBD1",
      light: "#EEFEFF",
      dark: "#166B6C",
      darkest: "#022F33"
    },
    secondary: {
      main: "#F08B00",
      light: "#F6AF4C"
    }
  };

export const theme = {
  colors,
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const ThemeProvider = BaseThemeProvider as ThemeProviderComponent<Theme>;
