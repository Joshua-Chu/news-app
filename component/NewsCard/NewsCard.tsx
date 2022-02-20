import {
    Avatar,
    Box,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "../../store/AuthProvider";

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

// TODO: Add how many mins to read

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
    const { isOpen, onOpen, onClose } = useDisclosure();

    const computedDate = new Date(created_at).toDateString().slice(4).trim();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete {title}?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Delete</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                    <Image src={banner} layout="fill" />
                    {route === "/profile" &&
                        currentUser &&
                        author.id === currentUser.id && (
                            <Box
                                position="absolute"
                                fontSize="2xl"
                                right="2"
                                top="2"
                                visibility="hidden"
                                className="delete-btn"
                                onClick={onOpen}
                                _hover={{
                                    fontSize: "3xl",
                                    transition: "all 200ms ease",
                                }}
                            >
                                🗑️
                            </Box>
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
                        dangerouslySetInnerHTML={{ __html: content }}
                        noOfLines={3}
                    />
                </Stack>
                <Stack mt={6} direction="row" spacing={4} align="center">
                    <Avatar
                        src={author.profile_photo}
                        name="Author"
                        bg="unset"
                    />
                    <Stack direction="column" spacing={0} fontSize="sm">
                        <Text fontWeight={600}>
                            @{author.email.split("@")[0]}
                        </Text>
                        <Text color="gray.500">{computedDate}· 6min read</Text>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};
