import { ExtractedNews, News } from "../types/news";

export const extractNews = (news: News[]): ExtractedNews[] => {
    return news.map(n => {
        return {
            id: n.id,
            title: n.title,
            content: n.content,
            created_at: n.created_at,
            banner: n.banner,
            author: {
                id: n.users.id,
                email: n.users.email,
                profile_photo: n.users.profile_photo,
            },
        };
    });
};
