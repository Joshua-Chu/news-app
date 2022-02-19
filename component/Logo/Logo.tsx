import { Box, Heading, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Logo = () => {
    const router = useRouter();
    return (
        <Box
            display="flex"
            alignItems="center"
            onClick={() => router.push("/")}
            cursor="pointer"
        >
            <Heading color="gray.600" fontSize="md">
                news<chakra.span color="yellow.400">.</chakra.span>
            </Heading>
        </Box>
    );
};
