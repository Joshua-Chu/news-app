import { Box } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Logo";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box pt={50}>
            <Logo />
            {children}
        </Box>
    );
};
