import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

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

const fonts = {
    heading: "Inter",
    body: "Source Sans Pro",
};

const theme = extendTheme({ config, fonts, breakpoints });

export default theme;
