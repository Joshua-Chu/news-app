import { Avatar, Flex, Text } from "@chakra-ui/react";

type AuthorProps = {
    email: string;
    profilePhoto: string;
};

export const Author = ({ email, profilePhoto }: AuthorProps) => {
    const authorEmail = `@${email.split("@")[0]}`;
    return (
        <Flex direction="column" alignItems="center" mb="48px" gap="8px">
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
