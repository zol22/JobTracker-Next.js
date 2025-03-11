import { SignInButton } from "@clerk/nextjs";

const LoginButton = () => {
    return (
        <SignInButton mode="modal">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Get Started
            </button>
        </SignInButton>
    )
}

export default LoginButton