const settings = {
    meta: {
        rootUrl: "https://news-app-rho-ten.vercel.app/",
        title: "News Application",
        description: "News Application for ISR Coding Test",
        social: {
            graphic:
                "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645358660/nkhfwtpom3yxlc4shf2u.png",
            twitter: "@joshchu_dev",
        },
    },
    routes: {
        authenticated: {
            pathAfterFailure: "/login",
        },
        public: {
            pathAfterFailure: "/documents",
        },
    },
};

export default settings;
