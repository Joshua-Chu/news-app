import NextLink from "next/link";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { SectionTitle } from "../component/SectionTitle";
import { useAuth } from "../store/AuthProvider";

// TODO : Remove data after login

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <Container>
            <SectionTitle>Login</SectionTitle>
            <form onSubmit={onLoginHandler}>
                <Box maxW={{ sm: "390px" }} mx="auto">
                    <Flex direction="column" gap="4">
                        <FormControl>
                            <FormLabel htmlFor="email">
                                <Text color="gray.600">email</Text>
                            </FormLabel>
                            <Input
                                id="email"
                                type="email"
                                size="md"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">
                                <Text color="gray.600">password</Text>
                            </FormLabel>
                            <Input
                                id="password"
                                type="password"
                                size="md"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Button
                            alignSelf="center"
                            minW="150px"
                            mt="48px"
                            bg="gray.700"
                            color="white"
                            _hover={{
                                color: "gray.600",
                                bg: "gray.100",
                            }}
                            type="submit"
                        >
                            <Text>Login</Text>
                        </Button>

                        <Box mt="32px" textAlign="center">
                            <Text
                                as="p"
                                color="gray.500"
                                fontSize={{ base: "sm", sm: "md" }}
                            >
                                Don&apos;t have an account yet?{" "}
                                <NextLink href="/signup" passHref>
                                    <Link color="gray.600" fontWeight="bold">
                                        Register here
                                    </Link>
                                </NextLink>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </form>
        </Container>
    );
};

export default Login;
