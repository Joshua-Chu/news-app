import NextLink from "next/link";
import { Box, Button, Container, Flex, Link, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SectionTitle } from "../component/SectionTitle";
import { useAuth } from "../store/AuthProvider";
import { SEO } from "../component/SEO";
import { FormInput } from "../component/FornInput";

const Login = () => {
    const router = useRouter();
    const { login, loading, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (email === "" || password === "") {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [email, password]);

    const onLoginHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { status } = (await login(email, password)) as unknown as {
            status: string;
        };

        if (status === "success") {
            setEmail("");
            setPassword("");
            router.push("/");
        }
    };

    return (
        <Container>
            <SEO
                url="/login"
                openGraphType="website"
                schemaType="article"
                title="Login | news."
                description="Login Page"
            />
            <SectionTitle>Login</SectionTitle>
            <Text textAlign="center" mx="auto" mb="16px" color="red.600">
                {error}
            </Text>
            <form onSubmit={onLoginHandler}>
                <Box maxW={{ sm: "390px" }} mx="auto">
                    <Flex direction="column" gap="4">
                        <FormInput
                            value={email}
                            onChange={setEmail}
                            type="email"
                        >
                            email
                        </FormInput>
                        <FormInput
                            value={password}
                            onChange={setPassword}
                            type="password"
                        >
                            password
                        </FormInput>

                        <Button
                            isLoading={loading}
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
                            isDisabled={isDisabled}
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
                                <NextLink href="/signup " passHref>
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
