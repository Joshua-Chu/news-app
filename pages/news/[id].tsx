import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Author } from "../../component/Author";
import { DeleteButton } from "../../component/DeleteButton";
import { EditButton } from "../../component/EditButton";
import { SEO } from "../../component/SEO";
import { supabase } from "../../lib/supabase/supabaseClient";
import { useAuth } from "../../store/AuthProvider";
import { ExtractedNews, News } from "../../types/news";
import { extractNews } from "../../utils";

type NewsDetailsProps = {
    data: ExtractedNews;
};

const NewsDetails = ({ data }: NewsDetailsProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    return (
        <>
            <SEO
                url={router.asPath}
                openGraphType="website"
                schemaType="article"
                title={`${data.title} | news`}
                description={data.title}
                image={data.banner}
            />
            <Box position="relative">
                {currentUser && data.author.id === currentUser.id && (
                    <>
                        <DeleteButton
                            title={data.title}
                            id={data.id}
                            isNewsDetail
                        />
                        <EditButton
                            title={data.title}
                            id={data.id}
                            isNewsDetail
                        />
                    </>
                )}
                <Button onClick={() => router.push("/")} mb="48px">
                    <Text as="p" color="gray.500">
                        Back
                    </Text>
                </Button>
                <Heading as="h2" textAlign="center" mb="32px" color="gray.600">
                    {data.title}
                </Heading>
                <Box
                    mb="32px"
                    position="relative"
                    h="350px"
                    width={{ base: "100vw", lg: "auto" }}
                    left={{ base: "50%", lg: "unset" }}
                    right={{ base: "50%", lg: "unset" }}
                    ml={{ base: "-50vw", lg: "unset" }}
                    mr={{ base: "-50vw", lg: "unset" }}
                >
                    <Image
                        src={data.banner}
                        layout="fill"
                        objectFit="cover"
                        alt="news banner"
                    />
                </Box>
                <Author
                    email={data.author.email}
                    profilePhoto={data.author.profile_photo}
                />

                <Box
                    color="gray.800"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </Box>
        </>
    );
};

export default NewsDetails;

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: news } = await supabase.from<News>("news").select(`*`);

    if (news) {
        const paths = news.map(n => ({
            params: { id: n.id },
        }));

        return {
            paths,
            fallback: "blocking",
        };
    }

    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const { data: news } = await supabase
        .from<News>("news")
        .select(
            `*,
            users(id, email, profile_photo)
            `
        )
        .eq("id", id);

    if (news) {
        const extractedNews = extractNews(news);
        return {
            props: {
                data: extractedNews[0],
            },
            revalidate: 5,
        };
    }

    return {
        props: {
            data: [],
        },
    };
};
