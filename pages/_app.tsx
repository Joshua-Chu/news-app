import { ChakraProvider } from "@chakra-ui/provider";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";
import theme from "../lib/theme";
import { Layout } from "../component/Layout";
import { AuthProvider } from "../store/AuthProvider";

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Layout router={router}>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
