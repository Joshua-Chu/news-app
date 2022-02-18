import { Box, Flex } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

type LayoutProps = {
    children: React.ReactNode;
    router: Router;
};

export const Layout = ({ children, router }: LayoutProps) => {
    return (
        <Flex pt={50} minH="100vh" direction="column">
            <Navbar currPath={router.asPath} />
            <Box flexGrow="1">{children}</Box>
            <Footer />
        </Flex>
    );
};
