import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ClerkProvider } from "@clerk/nextjs";
import Layout from '@/components/Layout';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}

export default MyApp;
