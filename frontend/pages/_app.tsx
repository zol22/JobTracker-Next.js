import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ClerkProvider } from "@clerk/nextjs";


/*-- New file for global configuration */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default MyApp;
