/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SectionTitle } from "../component/SectionTitle";
import { SEO } from "../component/SEO";
import { useAuth } from "../store/AuthProvider";

// TODO: Abstract Input and Label in another component
// TODO: Username to Email in Figma
//  TODO: Form validation
// TODO: Fix text alignment at the bottom

const SignUp = () => {
    const router = useRouter();
    const { signup } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const imageUploadHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const reader = new FileReader();

        reader.onload = onLoadEvent => {
            setImageSrc(onLoadEvent.target && onLoadEvent.target.result);
        };

        reader.readAsDataURL((target.files && target.files[0]) as Blob);

        setImageFile(target.files && target.files[0]);
    };

    const onRegisterHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Extract Image
        const formData = new FormData();
        if (imageFile) {
            formData.append("file", imageFile);
        }
        formData.append("upload_preset", "news-app");

        // // Store images to Cloudinary
        const data = await fetch(
            "https://api.cloudinary.com/v1_1/dlfecpmkj/image/upload",
            {
                method: "POST",
                body: formData,
            }
        ).then(r => r.json());

        const { status } = await signup(email, password, data.secure_url);

        if (status === "success") {
            setEmail("");
            setPassword("");
            setImageSrc("");
            setImageFile(null);

            router.push("/");
        }
    };

    return (
        <Container>
            <SEO
                url="/signup"
                openGraphType="website"
                schemaType="article"
                title="Sign up | news."
                description="Register now"
            />
            <SectionTitle>Register</SectionTitle>
            <form onSubmit={onRegisterHandler}>
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
                            type="submit"
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
