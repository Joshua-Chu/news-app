import { Box, Container, Flex } from "@chakra-ui/react";
import { Router } from "next/router";
import React from "react";
import useBreakpointValue from "../../hooks/useBreakPointValue";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

type LayoutProps = {
    children: React.ReactNode;
    router: Router;
};

export const Layout = ({ children, router }: LayoutProps) => {
    const containerMaxW = useBreakpointValue({
        base: "584px",
        md: "800px",
        lg: "996px",
    });

    return (
        <Flex pt={50} minH="100vh" direction="column">
            <Navbar currPath={router.asPath} />
            <Box flexGrow="1" mb="80px">
                <Container maxW={containerMaxW}>{children}</Container>
            </Box>
            <Footer />
        </Flex>
    );
};
