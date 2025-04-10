import { useEffect, useState} from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import Container from '@/components/Container';
import Benefits from '@/components/Benefits/Benefits';
import Testimonials from "@/components/Testimonials";

import Section from "@/components/Section";
import Spinner from "@/components/Spinner";

const Home = () => {

  const { isSignedIn, isLoaded } = useAuth(); // Get user auth status, this is a boolean
  const router = useRouter();  
  const [isRedirecting, setIsRedirecting] = useState(false); // Track redirect state


  // 🔄 Redirect to Dashboard if Signed In
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsRedirecting(true); // Set redirecting state
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

    // Show spinner while auth state is loading
    if (!isLoaded || isRedirecting) {
      return <Spinner />;
    }

    console.log(`this is the isLoaded from Clerk ${isLoaded}`)
  

  console.log(`Thi is isSignIn from Clerk ${isSignedIn}`)
  return (
      <>
        <Hero />
        <Container>
          <Benefits />

          <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>
        </Container>

      </>
    );

  
};

export default Home;
