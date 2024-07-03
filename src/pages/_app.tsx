import type {AppProps} from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";

export default function App({Component, pageProps}: AppProps) {

    const validateEnvSettings = () => {
        if (!process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY) {
            throw new Error('Invalid NEXT_PUBLIC_TWELVEDATA_API_KEY value')
        }
    }

    validateEnvSettings()

    return (
        <>
            <Head>
                <title>Metafar</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
