import { SignInButton } from "@clerk/nextjs";

const LoginButton = () => {
    return (
        <SignInButton mode="modal">
            <button className="text-black bg-primary hover:bg-primary-accent px-8 py-2 rounded-full transition-colors block w-fit ">
                  Login
            </button>
        </SignInButton>
    )
}

export default LoginButton