import { useUser } from "@clerk/nextjs";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import { NavBarProps } from "@/types";
import { menuItems } from "./menuItems";
import React from "react";
import { useJobStore } from "@/store/useJobStore";

const Navbar = () => {
  const { user } = useUser();
  const { selectedTab, setSelectedTab} =  useJobStore();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <h1 className="text-xl cursor-pointer hover:undeline" onClick={()=> {
        setSelectedTab("AllJobs");
        setIsOpen(false);
      }}>
          Welcome, {user?.username} 👋  
      </h1>

        {/* ✅ Logout Button (inside dropdown) */}  
        <div className="hidden lg:block">
            <LogoutButton />
          
        </div>
          
        {/* ✅ Mobile Menu Button (Hidden on Large Screens) */}
        <button
        className="lg:hidden px-4 py-2 bg-indigo-700 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
         {/* ✅ Mobile Dropdown Menu (Only for Small Screens) */}
         {isOpen && (
          <div className="absolute top-16 right-0 bg-gray-100 shadow-md p-4 rounded-md lg:hidden w-full ">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2 cursor-pointer p-2 rounded-md text-neutral-800  hover:bg-gray-200"
                  onClick={() => {
                    setSelectedTab(item.id); // Zustand Updates
                    setIsOpen(false);
                  }}
                >
                {React.createElement(item.icon, { size: 18 })}  {item.label}
                </li>
              ))}
                {/* ✅ Logout Button (inside dropdown) */}
                <li className="mt-2">
                  <LogoutButton />
                </li>
            </ul>
          </div>
      )}
  
    </nav>
  );
};

export default Navbar;
