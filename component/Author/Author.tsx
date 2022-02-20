import { Avatar, Flex, Text, chakra } from "@chakra-ui/react";

type AuthorProps = {
    email: string;
    profilePhoto: string;
};

export const Author = ({ email, profilePhoto }: AuthorProps) => {
    const authorEmail = `@${email.split("@")[0]}`;
    return (
        <Flex direction="column" alignItems="center" mb="48px" gap="8px">
            <Avatar size="md" bg="none" name={authorEmail} src={profilePhoto} />
            <Text as="p">
                written by:{" "}
                <chakra.span color="yellow.600">
                    {authorEmail.replace("@", "")}
                </chakra.span>
            </Text>
        </Flex>
    );
};
