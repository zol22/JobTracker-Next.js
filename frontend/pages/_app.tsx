import "../styles/globals.css";
import { AppProps } from "next/app";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import UnauthenticatedLayout from "@/components/UnauthenticatedLayout";
import Spinner from "@/components/Spinner";

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoaded, isSignedIn } = useAuth();

  // Show spinner while auth state is loading
  if (!isLoaded) return <Spinner />;

  // Use the appropriate layout based on the auth state
  const Layout = isSignedIn ? AuthenticatedLayout : UnauthenticatedLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ClerkProvider>
      <AppContent Component={Component} pageProps={pageProps} router={router} />
    </ClerkProvider>
  );
}