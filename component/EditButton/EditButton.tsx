import {
    Box,
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
import { useRouter } from "next/router";

type EditButtonProps = {
    title: string;
    id: string;
    isNewsDetail?: boolean;
};

export const EditButton = ({ title, id, isNewsDetail }: EditButtonProps) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onEditNews = async () => {
        router.push(`/edit/${id}`);
    };
    return (
        <>
            <Box
                cursor="pointer"
                position="absolute"
                fontSize="2xl"
                right="12"
                top="2"
                visibility={isNewsDetail ? "visible" : "hidden"}
                className="delete-btn"
                onClick={e => {
                    e.stopPropagation();
                    onOpen();
                }}
                _hover={{
                    fontSize: "3xl",
                    transition: "all 200ms ease",
                }}
            >
                ✏
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit {title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to Edit {title}?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={onEditNews}>
                            Edit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

EditButton.defaultProps = {
    isNewsDetail: false,
};
