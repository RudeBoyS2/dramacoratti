import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto-serif/600.css";
import "@fontsource/roboto-slab/400.css";
const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root, main, #__next": {
        height: "100%",
        width: "100%",
        bg: "#f1f2f3",
      },
    },
  },
  colors: {
    primary: "#003F50",
    secondary: "#3B7382",
    tertiary: "#B3AC8F",
    background: "#B3AC8F",
    font: "#dedede",
    fontSecondary: "#202020",
  },
  fonts: {
    primary: "Roboto Serif",
    secondary: 'Roboto Slab'
  },
});

export default theme;
