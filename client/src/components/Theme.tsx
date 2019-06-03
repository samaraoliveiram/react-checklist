import baseStyled, {
  ThemeProps,
  createGlobalStyle,
  ThemedStyledInterface,
  ThemeProvider as BaseThemeProvider,
  ThemeProviderComponent
} from "styled-components";

const colors = {
  base: {
    darkest: "#0B1216",
    darker: "#1C2F39",
    dark: "#305163",
    main: "#4B7890",
    ligh: "#729FB9",
    lighter: "#AAC8DB",
    lightest: "#F5F7F8"
  },
  secondary: {
    blue: "#5BC0EB",
    purple: "#7E6BF5",
    pink: "#F96DA3"
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
  Muli: "'Muli', sans-serif"
};

export const theme = {
  colors,
  sizes,
  fonts
};

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Muli:400,700&display=swap');
  body {
    background-color: ${colors.base.lightest};
    min-height: 100vh;
    font-family:'Muli', sans-serif; 
  }
`;

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export const ThemeProvider = BaseThemeProvider as ThemeProviderComponent<Theme>;
