export type News = {
    id: string;
    created_at: string;
    title: string;
    content: string;
    banner: string;
    author: string;
    users: {
        id: string;
        email: string;
        profile_photo: string;
    };
};

export type ExtractedNews = {
    id: string;
    title: string;
    content: string;
    created_at: string;
    banner: string;
    author: {
        id: string;
        email: string;
        profile_photo: string;
    };
};
