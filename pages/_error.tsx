import { Box } from "@chakra-ui/react";
import Image from "next/image";

export default function CustomError() {
    return (
        <Box position="relative" h="600px" w="80%" mx="auto">
            <Image
                src="https://res.cloudinary.com/dlfecpmkj/image/upload/v1645371460/dybpgrrc4s89pgsimsud.png"
                layout="fill"
            />
        </Box>
    );
}
