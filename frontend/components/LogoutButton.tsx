import { SignOutButton, useUser } from "@clerk/nextjs";

const LogoutButton = () => {
  const { isSignedIn } = useUser();

  return isSignedIn ? (
    <SignOutButton>
        <button className=" bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Logout
        </button>
    </SignOutButton>) : null;
};

export default LogoutButton;
