import {
    Avatar,
    Box,
    Heading,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useReadingTime } from "react-hook-reading-time";
import { useAuth } from "../../store/AuthProvider";
import { DeleteButton } from "../DeleteButton";
import { EditButton } from "../EditButton";

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
    route: string;
};

export const NewsCard = ({
    id,
    title,
    content,
    banner,
    // eslint-disable-next-line camelcase
    created_at,
    author,
    route,
}: NewsCardProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();
    const computedDate = new Date(created_at).toDateString().slice(4).trim();
    const { text } = useReadingTime(content);
    return (
        <>
            <Tooltip label={title} placement="top">
                <Box
                    onClick={() => router.push(`/news/${id}`)}
                    mx="auto"
                    key={id}
                    maxW={{ base: "350px", lg: "300px" }}
                    w="full"
                    bg={useColorModeValue("white", "gray.900")}
                    boxShadow="lg"
                    rounded="md"
                    p={6}
                    overflow="hidden"
                    cursor="pointer"
                    sx={{
                        "&:hover": {
                            ".delete-btn": {
                                visibility: "visible",
                                transition: "all 1s ease",
                            },
                        },
                    }}
                >
                    <Box
                        h="200px"
                        bg="gray.100"
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos="relative"
                    >
                        <Image src={banner} layout="fill" alt="news photo" />
                        {route === "/profile" &&
                            currentUser &&
                            author.id === currentUser.id && (
                                <>
                                    <DeleteButton title={title} id={id} />
                                    <EditButton title={title} id={id} />
                                </>
                            )}
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
                            dangerouslySetInnerHTML={{
                                __html: content
                                    .replace(/<a/g, "<span")
                                    .replace(/a>/g, "span>"),
                            }}
                            noOfLines={3}
                            sx={{
                                a: {
                                    outline: "none",
                                },
                            }}
                        />
                    </Stack>
                    <Stack mt={6} direction="row" spacing={4} align="center">
                        <Avatar
                            src={author.profile_photo}
                            name="Author"
                            bg="unset"
                            w="48px"
                            h="48px"
                        />
                        <Stack direction="column" spacing={0} fontSize="sm">
                            <Text fontWeight={600}>
                                @{author.email.split("@")[0]}
                            </Text>
                            <Text color="gray.500">
                                {computedDate}?? {text}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Tooltip>
        </>
    );
};
