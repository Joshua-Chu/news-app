import { Box, Heading, chakra } from "@chakra-ui/react";

export const Logo = () => {
    return (
        <Box px={4}>
            <Heading color="gray.600" fontSize="md">
                news<chakra.span color="yellow.400">.</chakra.span>
            </Heading>
        </Box>
    );
};
