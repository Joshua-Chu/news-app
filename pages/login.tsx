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
import { SectionTitle } from "../component/SectionTitle";

const Login = () => {
    return (
        <Container>
            <SectionTitle>Login</SectionTitle>
            <form>
                <Box maxW={{ sm: "390px" }} mx="auto">
                    <Flex direction="column" gap="4">
                        <FormControl>
                            <FormLabel htmlFor="username">
                                <Text color="gray.600">username</Text>
                            </FormLabel>
                            <Input id="username" type="text" size="md" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">
                                <Text color="gray.600">password</Text>
                            </FormLabel>
                            <Input id="password" type="text" size="md" />
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
                                <NextLink href="/register" passHref>
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
