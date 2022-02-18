import { ChakraProvider } from "@chakra-ui/provider";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "../lib/theme";
import { Layout } from "../component/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />;
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
