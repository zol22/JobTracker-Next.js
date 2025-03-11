/* /pages/dashboard */
import Navbar from "@/components/NavBar";
import { useState } from "react";
import SideBar from "@/components/SideBar";
import DashboardContent from "@/components/DashboardContent";


export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("AllJobs"); // Default page
  
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <Navbar setSelectedTab={setSelectedTab}/>

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/5  rounded-lg">
         <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-4/5 p-4 rounded-lg">
          <DashboardContent selectedTab={selectedTab}/>
        </div>
      </div>
    </div>
  );
}
