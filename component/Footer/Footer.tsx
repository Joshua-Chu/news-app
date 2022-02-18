import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Footer = () => {
    return (
        <Box bg="gray.800" color="white" py="25px">
            <Text textAlign="center">
                Made with passion by:{" "}
                <NextLink
                    passHref
                    href="https://www.linkedin.com/in/joshuachu627/"
                >
                    <Link target="_blank">Joshua Chu 🔥</Link>
                </NextLink>
            </Text>
        </Box>
    );
};
