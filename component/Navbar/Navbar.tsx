import {
    Avatar,
    Box,
    Button,
    Container,
    Heading,
    Stack,
    useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useAuth } from "../../store/AuthProvider";
import { Logo } from "../Logo";

type ButtonProps = {
    currPath: string;
    children: React.ReactNode;
    href: string;
};

const GhostLink = ({ currPath, children, href }: ButtonProps) => {
    return (
        <NextLink href={href} passHref>
            <Button
                size="sm"
                colorScheme="gray"
                variant="ghost"
                as="a"
                bg={currPath === href ? "gray.100" : ""}
            >
                <Heading as="p" fontSize="sm">
                    {children}
                </Heading>
            </Button>
        </NextLink>
    );
};

const SolidLink = ({ currPath, children, href }: ButtonProps) => {
    return (
        <NextLink href={href} passHref>
            <Button
                size="sm"
                bg={currPath === href ? "gray.100" : "gray.500"}
                variant="solid"
                as="a"
                _hover={{
                    color: currPath === href ? "white" : "gray.600",
                    bg: currPath === href ? "gray.500" : "gray.100",
                }}
                color={currPath === href ? "gray.600" : "white"}
            >
                <Heading as="p" fontSize="sm">
                    {children}
                </Heading>
            </Button>
        </NextLink>
    );
};

type NavbarProps = {
    currPath: string;
};

// TODO : Home Link
export const Navbar = ({ currPath }: NavbarProps) => {
    const { currentUser, logout } = useAuth();
    const containerMaxW = useBreakpointValue({ md: "800px", lg: "996px" });

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
                    {currentUser && (
                        <>
                            <SolidLink currPath={currPath} href="/create">
                                Create
                            </SolidLink>
                            <Button
                                size="sm"
                                colorScheme="gray"
                                variant="ghost"
                                onClick={logout}
                            >
                                <Heading as="p" fontSize="sm">
                                    Logout
                                </Heading>
                            </Button>
                            <Avatar
                                name={currentUser.email}
                                src={currentUser.profilePhoto as string}
                                size="sm"
                                bg="white"
                            />
                        </>
                    )}

                    {!currentUser && (
                        <>
                            <GhostLink currPath={currPath} href="/login">
                                Login
                            </GhostLink>
                            <SolidLink currPath={currPath} href="/signup">
                                Sign up
                            </SolidLink>
                        </>
                    )}
                </Stack>
            </Box>
        </Container>
    );
};
