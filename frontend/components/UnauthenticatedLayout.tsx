import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from "@/data/siteDetails";

type UnauthenticatedLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function UnauthenticatedLayout({ children, title, description }: UnauthenticatedLayoutProps) {
    const pageTitle = title || siteDetails.metadata.title;
    const pageDescription = description || siteDetails.metadata.description;
  return (
    <>
       <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}