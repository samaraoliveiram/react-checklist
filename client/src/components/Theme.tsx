import baseStyled, {
  ThemeProps,
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider as BaseThemeProvider,
  ThemeProviderComponent
} from "styled-components";

const colors = {
  base: {
    darkest: "#0B1119",
    darker: "#1E3048",
    dark: "#2E496E",
    main: "#506D97",
    ligh: "#7F97BB",
    lighter: "#B4C4DD",
    lightest: "#E9EEF7"
  },
  secondary: {
    blue: "#5BC0EB",
    yellow: "#FDE74C"
  }
};

const sizes = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "32px",
  xl: "40px"
};

const fonts = {
  Ubuntu: "'Ubuntu', sans-serif",
  Merriweather: "'Merriweather Sans', sans-serif",
  Titillium: "'Titillium Web', sans-serif"
};

export const theme = {
  colors,
  sizes,
  fonts
};

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Cabin:600|Merriweather+Sans:700|Raleway:700|Titillium+Web:700|Ubuntu:700&display=swap');
  body {
    background-color: ${colors.base.lightest};
    min-height: 100vh;
  }
`;

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const ThemeProvider = BaseThemeProvider as ThemeProviderComponent<Theme>;
