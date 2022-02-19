// theme.ts

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
// 2. Add your color mode config
const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const breakpoints = createBreakpoints({
    sm: "30em",
    md: "42.67em",
    lg: "66.67em",
    xl: "80em",
    "2xl": "96em",
});

// TODO: Adjust Fonts

const fonts = {
    heading: "Inter",
    body: "Source Sans Pro",
};

// 3. extend the theme
const theme = extendTheme({ config, fonts, breakpoints });

export default theme;
