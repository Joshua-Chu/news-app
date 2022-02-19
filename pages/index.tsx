import { Box, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../store/AuthProvider";

const Home = () => {
    const { currentUser } = useAuth();
    return (
        <Box>
            <pre>here: {JSON.stringify(currentUser)}</pre>
            <Heading>news.</Heading>
            <Text>Hello World</Text>
        </Box>
    );
};

export default Home;
