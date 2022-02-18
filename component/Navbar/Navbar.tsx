import { Box, Button, Container, Heading, Stack } from "@chakra-ui/react";
import { Logo } from "../Logo";

export const Navbar = () => {
    return (
        <Container
            pb="34"
            borderBottom="1px"
            borderColor="gray.400"
            boxShadow="sm"
            mb="60px"
        >
            <Box display="flex" justifyContent="space-between">
                <Logo />

                <Stack direction="row" color="gray.600">
                    <Button size="sm" colorScheme="gray" variant="ghost">
                        <Heading as="p" fontSize="sm">
                            login
                        </Heading>
                    </Button>
                    <Button size="sm" bg="gray.500" variant="solid">
                        <Heading
                            as="p"
                            _hover={{
                                color: "gray.600",
                            }}
                            color="white"
                            fontSize="sm"
                        >
                            sign up
                        </Heading>
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};
