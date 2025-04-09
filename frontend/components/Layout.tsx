// components/Layout.tsx
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteDetails } from "@/data/siteDetails";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

export default function Layout({ children, title, description }: LayoutProps) {
  const { isSignedIn } = useAuth(); // Check if the user is signed in
  const [selectedTab, setSelectedTab] = useState("AllJobs"); // Default page


  return (
    <>
      <Head>
        <title>{title || siteDetails.metadata.title}</title>
        <meta name="description" content={description || siteDetails.metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={title || siteDetails.metadata.title} />
        <meta property="og:description" content={description || siteDetails.metadata.description} />
        <meta property="og:image" content="/images/og-image.jpg" />
      </Head>

      {/* Show Header only if the user is not signed in */}
      {!isSignedIn && <Header />}


      <main>
        {/* Show Navbar if the user is signed in */}
        {isSignedIn && <NavBar setSelectedTab={setSelectedTab} />}
        {children}
      </main>


      {/* Show Footer only if the user is not signed in */}
      {!isSignedIn && <Footer />}
    </>
  );
}
