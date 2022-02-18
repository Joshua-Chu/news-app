import { Box } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../Navbar";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Box pt={50}>
            <Navbar />
            {children}
        </Box>
    );
};
