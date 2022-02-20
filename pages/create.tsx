import {
    Box,
    Button,
    CloseButton,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SectionTitle } from "../component/SectionTitle";
import { SEO } from "../component/SEO";
import { supabase } from "../lib/supabase/supabaseClient";
import { useAuth } from "../store/AuthProvider";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const CreateNews = () => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
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

    const onCreateNewsHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // Extract Image
        const formData = new FormData();
        if (imageFile) {
            formData.append("file", imageFile);
        }
        formData.append("upload_preset", "news-app");

        // // Store images to Cloudinary
        const imageData = await fetch(
            "https://api.cloudinary.com/v1_1/dlfecpmkj/image/upload",
            {
                method: "POST",
                body: formData,
            }
        ).then(r => r.json());

        // Create Post

        const { data } = await supabase.from("news").insert([
            {
                title,
                content,
                banner: imageData.secure_url,
                author: currentUser?.id,
            },
        ]);

        if (data) {
            setTitle("");
            setContent("");
            setImageSrc("");
            setImageFile(null);
        }
    };

    return (
        <Container>
            <SEO
                url={router.asPath}
                openGraphType="website"
                schemaType="article"
                title={`${currentUser?.email.split("@")[0]}'s Profile | news.`}
                description={`This is ${
                    currentUser?.email.split("@")[0]
                }'s Profile`}
                image={currentUser?.profilePhoto}
            />
            <SectionTitle>Create</SectionTitle>
            <form onSubmit={onCreateNewsHandler}>
                <Box maxW={{ sm: "390px" }} mx="auto">
                    <Flex direction="column" gap="4">
                        <FormControl>
                            <FormLabel htmlFor="title">
                                <Text color="gray.600">title</Text>
                            </FormLabel>
                            <Input
                                id="title"
                                type="text"
                                size="md"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="title">
                                <Text color="gray.600">Content</Text>
                            </FormLabel>

                            <QuillNoSSRWrapper
                                theme="snow"
                                style={{
                                    height: "500px",
                                    marginBottom: "32px",
                                }}
                                value={content}
                                onChange={setContent}
                            />
                        </FormControl>

                        <Flex direction="column" gap="32px" mt="32px">
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
                                position="relative"
                            >
                                {imageSrc && (
                                    <>
                                        <Image
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
                            <Text>Create</Text>
                        </Button>
                    </Flex>
                </Box>
            </form>
        </Container>
    );
};

export default CreateNews;
