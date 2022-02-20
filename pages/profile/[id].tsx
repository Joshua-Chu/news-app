import { Box, Grid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabase/supabaseClient";
import { News, ExtractedNews } from "../../types/news";
import { extractNews } from "../../utils";
import { NewsCard } from "../../component/NewsCard";
import { SectionTitle } from "../../component/SectionTitle";
import { useAuth } from "../../store/AuthProvider";
import { SEO } from "../../component/SEO";

type MyProfileProps = {
    data: ExtractedNews[];
};

const MyProfile = ({ data }: MyProfileProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    return (
        <>
            <SEO
                url={router.asPath}
                openGraphType="website"
                schemaType="article"
                title={`This is ${currentUser?.email.split("@")[0]}'s Profile`}
                description={`This is ${
                    currentUser?.email.split("@")[0]
                }'s Profile`}
                image={currentUser?.profilePhoto}
            />
            <Box>
                <SectionTitle>
                    @{currentUser && currentUser.email.split("@")[0]}&apos;s
                    News
                </SectionTitle>
                <Grid
                    justifyContent="center"
                    templateColumns={{
                        base: "1fr",
                        md: "repeat(2, minmax(auto, 350px))",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap="20px"
                >
                    {data.map(cardData => (
                        <NewsCard
                            {...cardData}
                            key={cardData.id}
                            route="/profile"
                        />
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default MyProfile;

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
        .eq("author", id);

    if (news) {
        const extractedNews = extractNews(news);
        return {
            props: {
                data: extractedNews,
            },
        };
    }

    return {
        props: {
            data: news,
        },
    };
};
