import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Hero from "@/components/Hero";
import Container from '@/components/Container';
import Benefits from '@/components/Benefits/Benefits';


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
        </Container>

      </>
    );

  
};

export default Home;
