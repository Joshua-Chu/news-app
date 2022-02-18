import { Box } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import { Navbar } from "../Navbar";

type LayoutProps = {
    children: React.ReactNode;
    router: Router;
};

export const Layout = ({ children, router }: LayoutProps) => {
    return (
        <Box pt={50}>
            <Navbar currPath={router.asPath} />
            {children}
        </Box>
    );
};
