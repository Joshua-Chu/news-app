import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Author } from "../../component/Author";
import { supabase } from "../../lib/supabase/supabaseClient";
import { ExtractedNews, News } from "../../types/news";
import { extractNews } from "../../utils";

type NewsDetailsProps = {
    data: ExtractedNews;
};

const NewsDetails = ({ data }: NewsDetailsProps) => {
    const router = useRouter();
    return (
        <Box>
            <Button onClick={() => router.push("/")}>
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
                <Image src={data.banner} layout="fill" objectFit="cover" />
            </Box>
            <Author
                email={data.author.email}
                profilePhoto={data.author.profile_photo}
            />

            <Box
                color="gray.500"
                dangerouslySetInnerHTML={{ __html: data.content }}
            />
        </Box>
    );
};

export default NewsDetails;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const { data: news } = await supabase
        .from<News>("news")
        .select(
            `
    *,
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
        };
    }

    return {
        props: {
            data: [],
        },
    };
};
