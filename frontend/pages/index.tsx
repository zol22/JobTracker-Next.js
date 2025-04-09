import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import Container from '@/components/Container';
import Benefits from '@/components/Benefits/Benefits';
import Testimonials from "@/components/Testimonials";

import Section from "@/components/Section";

const Home = () => {

  const { isSignedIn } = useAuth(); // Get user auth status, this is a boolean
  const router = useRouter();

  // 🔄 Redirect to Dashboard if Signed In
  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

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
