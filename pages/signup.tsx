import {
    Box,
    Button,
    CloseButton,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React, { useState } from "react";
import { SectionTitle } from "../component/SectionTitle";

const SignUp = () => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");

    const imageUploadHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const reader = new FileReader();

        reader.onload = onLoadEvent => {
            setImageSrc(onLoadEvent.target && onLoadEvent.target.result);
        };

        reader.readAsDataURL((target.files && target.files[0]) as Blob);
    };

    return (
        <Container>
            <SectionTitle>Register</SectionTitle>
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

                        <Flex direction="column" gap="32px">
                            <FormControl>
                                <FormLabel htmlFor="profile-photo">
                                    <Text color="gray.600">profile photo</Text>
                                </FormLabel>
                                <Input
                                    id="profile-photo"
                                    type="file"
                                    size="md"
                                    onChange={imageUploadHandler}
                                />
                            </FormControl>
                            {imageSrc && (
                                <CloseButton onClick={() => setImageSrc("")} />
                            )}

                            <Box
                                border={imageSrc ? "" : "1px"}
                                w="full"
                                h="380px"
                                borderRadius="full"
                                position="relative"
                                sx={{
                                    ".image-holder": {
                                        borderRadius: "full",
                                    },
                                }}
                            >
                                {imageSrc && (
                                    <>
                                        <Image
                                            className="image-holder"
                                            src={imageSrc as unknown as string}
                                            layout="fill"
                                        />
                                    </>
                                )}
                            </Box>
                        </Flex>

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
                            <Text>Register</Text>
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

export default SignUp;
