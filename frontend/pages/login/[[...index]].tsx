import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const LoginPage = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">Sign In</h1>
        <SignIn path="/login" />
      </div>
    </div>
  );
};

export default LoginPage;
