import { Box, Grid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NewsCard } from "../component/NewsCard";
import { supabase } from "../lib/supabase/supabaseClient";
import { ExtractedNews, News } from "../types/news";
import { extractNews } from "../utils";

type HomeProps = {
    data: ExtractedNews[] | [];
};
const Home = ({ data }: HomeProps) => {
    return (
        <Box>
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
                    <NewsCard {...cardData} key={cardData.id} />
                ))}
            </Grid>
        </Box>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data: news } = await supabase.from<News>("news").select(`
    *,
    users(id, email, profile_photo)
  `);

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
            data: [],
        },
    };
};
