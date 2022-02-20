import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

type AuthorProps = {
    email: string;
    profilePhoto: string;
    userId: string;
};

export const Author = ({ email, profilePhoto, userId }: AuthorProps) => {
    const router = useRouter();
    const authorEmail = `@${email.split("@")[0]}`;
    return (
        <Flex
            direction="column"
            alignItems="center"
            mb="48px"
            gap="8px"
            onClick={() => router.push(`/profile/${userId}`)}
            cursor="pointer"
        >
            <Avatar
                size="md"
                bg="none"
                name={authorEmail}
                src={profilePhoto}
                w="48px"
                h="48px"
            />
            <Text as="p">written by: {authorEmail.replace("@", "")}</Text>
        </Flex>
    );
};
