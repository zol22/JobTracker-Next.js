import { useUser } from "@clerk/nextjs";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl">Welcome, {user?.username} 👋</h1>
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
