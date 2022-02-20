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
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SectionTitle } from "../../component/SectionTitle";
import { SEO } from "../../component/SEO";
import { supabase } from "../../lib/supabase/supabaseClient";
import { useAuth } from "../../store/AuthProvider";
import { RawNews } from "../../types/news";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

type EditNewsProps = {
    data: RawNews;
};

const EditNews = ({ data }: EditNewsProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(data.title);
    const [content, setContent] = useState(data.content);
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(
        data.banner
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (!currentUser || currentUser.id !== data.author) {
            router.push("/");
        }
    }, [currentUser, router, data.author]);

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

    const onEditNewsHandler = async (e: React.SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();

        // Extract Image

        let newsEditData = {
            title,
            content,
            banner: data.banner,
            author: currentUser?.id,
        };

        if (imageSrc !== data.banner) {
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

            newsEditData = {
                title,
                content,
                banner: imageData.secure_url,
                author: currentUser?.id,
            };
        }

        // Update Post

        const { data: newsData } = await supabase
            .from("news")
            .update([newsEditData])
            .eq("id", data.id);

        if (newsData) {
            setTitle("");
            setContent("");
            setImageSrc("");
            setImageFile(null);
            setLoading(true);
            router.push(`/`);
        }
    };

    return (
        <Container>
            <SEO
                url={router.asPath}
                openGraphType="website"
                schemaType="article"
                title={`Edit | ${data.title}`}
                description={`Editing | ${data.title}`}
            />
            <SectionTitle>Edit</SectionTitle>
            <form onSubmit={onEditNewsHandler}>
                <Box maxW={{ sm: "390px", md: "800px", lg: "996px" }} mx="auto">
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

                        <Flex justifyContent="space-between">
                            <Button
                                alignSelf="center"
                                minW="150px"
                                mt="48px"
                                color="gray.600"
                                type="submit"
                                variant="ghost"
                            >
                                <Text>Cancel</Text>
                            </Button>{" "}
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
                                isLoading={loading}
                            >
                                <Text>Update</Text>
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </form>
        </Container>
    );
};

export default EditNews;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const { data: news } = await supabase
        .from<RawNews>("news")
        .select(`*`)
        .eq("id", id);

    if (news && news[0]) {
        return {
            props: {
                data: news[0],
            },
        };
    }

    return {
        props: {
            data: [],
        },
    };
};
