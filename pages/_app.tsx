import { ChakraProvider } from "@chakra-ui/provider";
import "../styles/globals.css";
import "../styles/nprogress.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import theme from "../lib/theme";
import { Layout } from "../component/Layout";
import { AuthProvider } from "../store/AuthProvider";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
