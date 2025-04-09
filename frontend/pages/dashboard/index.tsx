/* /pages/dashboard */
import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import DashboardContent from "@/components/DashboardContent";
import { useJobStore } from "@/store/useJobStore";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("AllJobs"); // Default page
  const { fetchJobs, loading } = useJobStore();

  // 🔥 Fetch jobs when user signs in
  useEffect(() => {
    fetchJobs();
  },[fetchJobs])


  return (
    <div className="min-h-screen p-6 bg-gray-100">

      {/* Main Dashboard Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/5  rounded-lg">
         <SideBar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        </div>

        {/* Right Section changes based of SideBar Selection */}
        <div className="w-full lg:w-4/5 p-4 rounded-lg">
          {loading ? (
            <p className="text-center text-gray-600"> Loading jobs... </p>
          ): <DashboardContent selectedTab={selectedTab}/>
 }
        </div>
      </div>
    </div>
  );
}
