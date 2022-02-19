import {
    Box,
    Button,
    Container,
    Heading,
    Stack,
    useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { Logo } from "../Logo";

type NavbarProps = {
    currPath: string;
};

// TODO : Abstract Nav link items

export const Navbar = ({ currPath }: NavbarProps) => {
    const containerMaxW = useBreakpointValue({ md: "584px", lg: "996px" });

    return (
        <Container mb="60px" maxW={containerMaxW}>
            <Box
                display="flex"
                justifyContent="space-between"
                borderBottom="1px"
                pb="34"
                borderColor="gray.400"
                boxShadow="sm"
            >
                <Logo />

                <Stack direction="row" color="gray.600">
                    <Link href="/login" passHref>
                        <Button
                            size="sm"
                            colorScheme="gray"
                            variant="ghost"
                            as="a"
                            bg={currPath === "/login" ? "gray.100" : ""}
                        >
                            <Heading as="p" fontSize="sm">
                                login
                            </Heading>
                        </Button>
                    </Link>

                    <Link href="/signup" passHref>
                        <Button
                            size="sm"
                            bg={
                                currPath === "/signup" ? "gray.100" : "gray.500"
                            }
                            variant="solid"
                            as="a"
                            _hover={{
                                color:
                                    currPath === "/signup"
                                        ? "white"
                                        : "gray.600",
                                bg:
                                    currPath === "/signup"
                                        ? "gray.500"
                                        : "gray.100",
                            }}
                            color={
                                currPath === "/signup" ? "gray.600" : "white"
                            }
                        >
                            <Heading as="p" fontSize="sm">
                                sign up
                            </Heading>
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
    );
};
