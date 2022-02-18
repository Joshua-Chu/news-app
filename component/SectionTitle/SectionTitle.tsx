import { Heading, chakra, Box } from "@chakra-ui/react";
import React from "react";

type SectionTitleProps = {
    children: React.ReactNode;
};

export const SectionTitle = ({ children }: SectionTitleProps) => {
    return (
        <Box mb="48px" textAlign="center">
            <Heading as="h1" color="gray.500">
                {children}
                <chakra.span color="yellow.400">.</chakra.span>
            </Heading>
        </Box>
    );
};
