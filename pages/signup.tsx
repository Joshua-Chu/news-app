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
import React, { useEffect, useState } from "react";
import { FormInput } from "../component/FornInput";
import { SectionTitle } from "../component/SectionTitle";
import { SEO } from "../component/SEO";
import { useAuth } from "../store/AuthProvider";

const SignUp = () => {
    const router = useRouter();
    const { signup, loading, error } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (email === "" || password === "" || !imageFile) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [email, password, imageFile]);

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
            <Text textAlign="center" mx="auto" mb="16px" color="red.600">
                {error}
            </Text>
            <form onSubmit={onRegisterHandler}>
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
                            <Text>Register</Text>
                        </Button>

                        <Box mt="32px" textAlign="center">
                            <Text
                                as="p"
                                color="gray.500"
                                fontSize={{ base: "sm", sm: "md" }}
                            >
                                Already have an account?{" "}
                                <NextLink href="/login" passHref>
                                    <Link color="gray.600" fontWeight="bold">
                                        Login here
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
