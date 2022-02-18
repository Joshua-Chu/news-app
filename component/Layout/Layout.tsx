import { Box } from "@chakra-ui/react";
import React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
    return <Box pt={50}>{children}</Box>;
};
