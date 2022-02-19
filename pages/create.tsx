import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text,
} from "@chakra-ui/react";
import { SectionTitle } from "../component/SectionTitle";

const CreateNews = () => {
    return (
        <Container>
            <SectionTitle>Create</SectionTitle>
            <form>
                <Box maxW={{ sm: "390px" }} mx="auto">
                    <Flex direction="column" gap="4">
                        <FormControl>
                            <FormLabel htmlFor="title">
                                <Text color="gray.600">title</Text>
                            </FormLabel>
                            <Input id="title" type="text" size="md" />
                        </FormControl>

                        {/* <Flex direction="column" gap="32px">
                            <FormControl>
                                <FormLabel htmlFor="profile-photo">
                                    <Text color="gray.600">profile photo</Text>
                                </FormLabel>
                                <Input
                                    id="profile-photo"
                                    type="file"
                                    size="md"
                                />
                            </FormControl>
                            {imageSrc && (
                                <CloseButton onClick={() => setImageSrc("")} />
                            )}

                            <Box
                                border={imageSrc ? "" : "1px"}
                                w="full"
                                h="380px"
                                borderRadius="full"
                                position="relative"
                                sx={{
                                    ".image-holder": {
                                        borderRadius: "full",
                                    },
                                }}
                            >
                                {imageSrc && (
                                    <>
                                        <Image
                                            className="image-holder"
                                            src={imageSrc as unknown as string}
                                            layout="fill"
                                        />
                                    </>
                                )}
                            </Box>
                        </Flex> */}

                        <Button
                            alignSelf="center"
                            minW="150px"
                            mt="48px"
                            bg="gray.700"
                            color="white"
                            _hover={{
                                color: "gray.600",
                                bg: "gray.100",
                            }}
                            type="submit"
                        >
                            <Text>Create</Text>
                        </Button>
                    </Flex>
                </Box>
            </form>
        </Container>
    );
};

export default CreateNews;
