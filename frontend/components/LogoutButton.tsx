import { SignOutButton, useUser } from "@clerk/nextjs";

const LogoutButton = () => {
  const { isSignedIn } = useUser();

  return isSignedIn ? (
    <SignOutButton>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
        </button>
    </SignOutButton>) : null;
};

export default LogoutButton;
