import {
    Avatar,
    Box,
    Heading,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";

type NewsCardProps = {
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

// TODO: Add how many mins to read

export const NewsCard = ({
    id,
    title,
    content,
    banner,
    // eslint-disable-next-line camelcase
    created_at,
    author,
}: NewsCardProps) => {
    const computedDate = new Date(created_at).toDateString().slice(4).trim();
    return (
        <Box
            mx="auto"
            key={id}
            maxW={{ base: "350px", lg: "300px" }}
            w="full"
            bg={useColorModeValue("white", "gray.900")}
            boxShadow="lg"
            rounded="md"
            p={6}
            overflow="hidden"
        >
            <Box h="200px" bg="gray.100" mt={-6} mx={-6} mb={6} pos="relative">
                <Image src={banner} layout="fill" />
            </Box>
            <Stack>
                <Heading
                    color={useColorModeValue("gray.700", "white")}
                    fontSize="2xl"
                >
                    {title}
                </Heading>
                <Box
                    color="gray.500"
                    dangerouslySetInnerHTML={{ __html: content }}
                    noOfLines={3}
                />
            </Stack>
            <Stack mt={6} direction="row" spacing={4} align="center">
                <Avatar
                    src="https://res.cloudinary.com/dlfecpmkj/image/upload/v1645279013/news-upload/drpmrxq3hywlpyjlti6p.png"
                    name="Author"
                />
                <Stack direction="column" spacing={0} fontSize="sm">
                    <Text fontWeight={600}>@{author.email.split("@")[0]}</Text>
                    <Text color="gray.500">{computedDate}· 6min read</Text>
                </Stack>
            </Stack>
        </Box>
    );
};
