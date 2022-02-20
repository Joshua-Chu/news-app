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
import { supabase } from "../../lib/supabase/supabaseClient";

type DeleteButtonProps = {
    title: string;
    id: string;
};

// TODO: router reload change

export const DeleteButton = ({ title, id }: DeleteButtonProps) => {
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onDeleteNews = async () => {
        const { data } = await supabase.from("news").delete().match({ id });
        if (data) {
            router.reload();
        }
    };
    return (
        <>
            <Box
                position="absolute"
                fontSize="2xl"
                right="2"
                top="2"
                visibility="hidden"
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
                🗑️
            </Box>

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
                        <Button variant="ghost" onClick={onDeleteNews}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
