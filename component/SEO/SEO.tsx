import React from "react";
import Head from "next/head";
import settings from "./settings";

type SocialTagsProps = {
    openGraphType: string | undefined;
    url: string | undefined;
    title: string | undefined;
    description: string | undefined;
    image: string | undefined;
};

const socialTags = ({
    openGraphType,
    url,
    title,
    description,
    image,
}: SocialTagsProps) => {
    return [
        { name: "twitter:card", content: "summary_large_image" },
        {
            name: "twitter:site",
            content:
                settings &&
                settings.meta &&
                settings.meta.social &&
                settings.meta.social.twitter,
        },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
            name: "twitter:creator",
            content:
                settings &&
                settings.meta &&
                settings.meta.social &&
                settings.meta.social.twitter,
        },
        { name: "twitter:image:src", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "og:title", content: title },
        { name: "og:type", content: openGraphType },
        { name: "og:url", content: url },
        { name: "og:image", content: image },
        { name: "og:description", content: description },
        {
            name: "og:site_name",
            content: settings && settings.meta && settings.meta.title,
        },
    ];
};

type SEOProps = {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    openGraphType?: string;
    schemaType?: string;
};

export const SEO = ({
    title,
    description,
    image,
    url,
    openGraphType,
    schemaType,
}: SEOProps) => {
    return (
        <Head>
            <title>{title} | App</title>
            <meta name="description" content={description} />
            <meta itemProp="name" content={title} />
            <meta itemProp="description" content={description} />
            <meta itemProp="image" content={image} />
            {socialTags({ title, description, image, url, openGraphType }).map(
                ({ name, content }) => {
                    return <meta key={name} name={name} content={content} />;
                }
            )}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "http://schema.org",
                        "@type": schemaType,
                        name: title,
                        about: description,
                        url,
                    }),
                }}
            />
        </Head>
    );
};

SEO.defaultProps = {
    title: settings && settings.meta && settings.meta.title,
    description: settings && settings.meta && settings.meta.description,
    image:
        settings &&
        settings.meta &&
        settings.meta.social &&
        settings.meta.social.graphic,
    openGraphType: "website",
    url: "/",
    schemaType: "Article",
};
